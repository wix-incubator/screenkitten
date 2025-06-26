import execa from 'execa';

import type { ScreenkittenOptionsIOS, ScreenkittenOptionsBase, Screenkitten } from './types';
import {
  ScreenkittenOperationAbortedError,
  ScreenkittenXcrunNotFoundError,
  ScreenkittenIOSSimulatorError,
  ScreenkittenInvalidTypeError,
  ScreenkittenScreenshotFailedError
} from './errors';
import { doHandleError, createTempScreenshotPath } from './utils';

/**
 * iOS screenshot implementation using xcrun simctl
 */
export class ScreenkittenIOS implements Screenkitten {
  private xcrunPath: string;
  private options: ScreenkittenOptionsIOS;

  constructor(options: ScreenkittenOptionsIOS) {
    this.options = options;
    this.xcrunPath = options.xcrunPath || '/usr/bin/xcrun';
  }

  async takeScreenshot(overrideOptions: Partial<ScreenkittenOptionsBase> = {}): Promise<string> {
    const options = { ...this.options, ...overrideOptions };

    const deviceId = options.deviceId || 'booted';
    const type = (options as ScreenkittenOptionsIOS).type || 'png';
    const display = (options as ScreenkittenOptionsIOS).display || 'internal';
    const mask = (options as ScreenkittenOptionsIOS).mask || 'ignored';
    const outputPath = options.outputPath || createTempScreenshotPath('ios', type);
    const onError = options.onError || 'throw';

    // Validate screenshot type
    if (type !== 'png' && type !== 'jpeg') {
      const error = new ScreenkittenInvalidTypeError(type);
      return doHandleError(onError, error, Promise.resolve(outputPath));
    }

    const args = [
      'simctl', 'io', deviceId, 'screenshot',
      '--type', type,
      '--display', display,
      '--mask', mask,
      outputPath
    ];

    try {
      // Check for abort signal before starting
      if (options.abortSignal?.aborted) {
        throw new ScreenkittenOperationAbortedError('iOS screenshot');
      }

      await execa(this.xcrunPath, args, {
        signal: options.abortSignal
      } as any); // Type assertion to bypass outdated definitions
      return outputPath;
    } catch (error) {
      const screenshotError = this._classifyError(error, deviceId);
      return doHandleError(onError, screenshotError, Promise.resolve(outputPath));
    }
  }

  private _classifyError(error: unknown, deviceId: string): Error {
    if (error instanceof Error) {
      if (error.message.includes('ENOENT') || error.message.includes('command not found')) {
        return new ScreenkittenXcrunNotFoundError(this.xcrunPath, error);
      } else if (error.message.includes('Invalid device') || error.message.includes('device not found')) {
        return new ScreenkittenIOSSimulatorError(deviceId, error);
      } else if (error.message.includes('aborted') || error.name === 'AbortError') {
        return new ScreenkittenOperationAbortedError('iOS screenshot');
      } else {
        return new ScreenkittenScreenshotFailedError('ios', error);
      }
    } else {
      return new ScreenkittenScreenshotFailedError('ios');
    }
  }
}
