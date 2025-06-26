import fs from 'node:fs/promises';

import execa from 'execa';

import type { ScreenkittenOptionsAndroid, ScreenkittenOptionsBase, Screenkitten } from './types';
import {
  ScreenkittenOperationAbortedError,
  ScreenkittenAdbNotFoundError,
  ScreenkittenAndroidDeviceError,
  ScreenkittenFileWriteError,
  ScreenkittenScreenshotFailedError
} from './errors';
import { doHandleError, createTempScreenshotPath } from './utils';

/**
 * Android screenshot implementation using adb
 */
export class ScreenkittenAndroid implements Screenkitten {
  private adbPath: string;
  private options: ScreenkittenOptionsAndroid;

  constructor(options: ScreenkittenOptionsAndroid) {
    this.options = options;
    this.adbPath = options.adbPath || 'adb';
  }

  async takeScreenshot(overrideOptions: Partial<ScreenkittenOptionsBase> = {}): Promise<string> {
    const options = { ...this.options, ...overrideOptions };

    const deviceId = options.deviceId || 'booted';
    const outputPath = options.outputPath || createTempScreenshotPath('android', 'png');
    const onError = options.onError || 'throw';

    try {
      // Check for abort signal before starting
      if (options.abortSignal?.aborted) {
        throw new ScreenkittenOperationAbortedError('Android screenshot');
      }

      const args = deviceId === 'booted'
        ? ['exec-out', 'screencap', '-p']
        : ['-s', deviceId, 'exec-out', 'screencap', '-p'];

      const result = await execa(this.adbPath, args, {
        encoding: null, // Return buffer for binary data
        signal: options.abortSignal
      } as any); // Type assertion to bypass outdated definitions

      await fs.writeFile(outputPath, result.stdout);
      return outputPath;
    } catch (error) {
      const screenshotError = this._classifyError(error, deviceId, outputPath);
      return doHandleError(onError, screenshotError, Promise.resolve(outputPath));
    }
  }

  private _classifyError(error: unknown, deviceId: string, outputPath: string): Error {
    if (error instanceof Error) {
      if (error.message.includes('ENOENT') || error.message.includes('command not found')) {
        return new ScreenkittenAdbNotFoundError(this.adbPath, error);
      } else if (error.message.includes('device not found') || error.message.includes('device offline')) {
        return new ScreenkittenAndroidDeviceError(deviceId, error);
      } else if (error.message.includes('aborted') || error.name === 'AbortError') {
        return new ScreenkittenOperationAbortedError('Android screenshot');
      } else if ((error as NodeJS.ErrnoException).code === 'ENOENT' || (error as NodeJS.ErrnoException).code === 'EACCES') {
        return new ScreenkittenFileWriteError(outputPath, error);
      } else {
        return new ScreenkittenScreenshotFailedError('android', error);
      }
    } else {
      return new ScreenkittenScreenshotFailedError('android');
    }
  }

}
