import { test, describe } from 'node:test';
import { strictEqual } from 'node:assert';

import {
  ScreenkittenError,
  ScreenkittenDeviceNotFoundError,
  ScreenkittenXcrunNotFoundError,
  ScreenkittenAdbNotFoundError,
  ScreenkittenIOSSimulatorError,
  ScreenkittenAndroidDeviceError,
  ScreenkittenFileWriteError,
  ScreenkittenOperationAbortedError,
  ScreenkittenScreenshotFailedError,
  ScreenkittenInvalidTypeError
} from './errors';

describe('Screenkitten Error Classes', () => {

  describe('ScreenkittenError', () => {
    test('should create base error with message', () => {
      const error = new ScreenkittenError('Test error message');

      strictEqual(error.name, 'ScreenkittenError');
      strictEqual(error.message, 'Test error message');
      strictEqual(error instanceof Error, true);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create base error with cause', () => {
      const causeError = new Error('Underlying cause');
      const error = new ScreenkittenError('Test error message', { cause: causeError });

      strictEqual(error.name, 'ScreenkittenError');
      strictEqual(error.message, 'Test error message');
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenDeviceNotFoundError', () => {
    test('should create device not found error with device ID', () => {
      const deviceId = 'device-123';
      const error = new ScreenkittenDeviceNotFoundError(deviceId);

      strictEqual(error.name, 'ScreenkittenDeviceNotFoundError');
      strictEqual(error.message, `Device not found: ${deviceId}`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create device not found error with cause', () => {
      const deviceId = 'device-123';
      const causeError = new Error('Underlying cause');
      const error = new ScreenkittenDeviceNotFoundError(deviceId, causeError);

      strictEqual(error.name, 'ScreenkittenDeviceNotFoundError');
      strictEqual(error.message, `Device not found: ${deviceId}`);
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenXcrunNotFoundError', () => {
    test('should create xcrun not found error with path', () => {
      const xcrunPath = '/usr/bin/xcrun';
      const error = new ScreenkittenXcrunNotFoundError(xcrunPath);

      strictEqual(error.name, 'ScreenkittenXcrunNotFoundError');
      strictEqual(error.message, `xcrun not found at path: ${xcrunPath}`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create xcrun not found error with cause', () => {
      const xcrunPath = '/nonexistent/xcrun';
      const causeError = new Error('File not found');
      const error = new ScreenkittenXcrunNotFoundError(xcrunPath, causeError);

      strictEqual(error.name, 'ScreenkittenXcrunNotFoundError');
      strictEqual(error.message, `xcrun not found at path: ${xcrunPath}`);
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenAdbNotFoundError', () => {
    test('should create adb not found error with path', () => {
      const adbPath = '/usr/bin/adb';
      const error = new ScreenkittenAdbNotFoundError(adbPath);

      strictEqual(error.name, 'ScreenkittenAdbNotFoundError');
      strictEqual(error.message, `adb not found at path: ${adbPath}`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create adb not found error with cause', () => {
      const adbPath = '/nonexistent/adb';
      const causeError = new Error('File not found');
      const error = new ScreenkittenAdbNotFoundError(adbPath, causeError);

      strictEqual(error.name, 'ScreenkittenAdbNotFoundError');
      strictEqual(error.message, `adb not found at path: ${adbPath}`);
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenIOSSimulatorError', () => {
    test('should create iOS simulator error with device ID', () => {
      const deviceId = 'booted';
      const error = new ScreenkittenIOSSimulatorError(deviceId);

      strictEqual(error.name, 'ScreenkittenIOSSimulatorError');
      strictEqual(error.message, `iOS Simulator not available or not booted: ${deviceId}`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create iOS simulator error with cause', () => {
      const deviceId = 'simulator-123';
      const causeError = new Error('Simulator not running');
      const error = new ScreenkittenIOSSimulatorError(deviceId, causeError);

      strictEqual(error.name, 'ScreenkittenIOSSimulatorError');
      strictEqual(error.message, `iOS Simulator not available or not booted: ${deviceId}`);
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenAndroidDeviceError', () => {
    test('should create Android device error with device ID', () => {
      const deviceId = 'emulator-5554';
      const error = new ScreenkittenAndroidDeviceError(deviceId);

      strictEqual(error.name, 'ScreenkittenAndroidDeviceError');
      strictEqual(error.message, `Android device/emulator not available: ${deviceId}`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create Android device error with cause', () => {
      const deviceId = 'device-123';
      const causeError = new Error('Device offline');
      const error = new ScreenkittenAndroidDeviceError(deviceId, causeError);

      strictEqual(error.name, 'ScreenkittenAndroidDeviceError');
      strictEqual(error.message, `Android device/emulator not available: ${deviceId}`);
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenFileWriteError', () => {
    test('should create file write error with output path', () => {
      const outputPath = '/tmp/screenshot.png';
      const error = new ScreenkittenFileWriteError(outputPath);

      strictEqual(error.name, 'ScreenkittenFileWriteError');
      strictEqual(error.message, `Failed to write screenshot file: ${outputPath}`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create file write error with cause', () => {
      const outputPath = '/readonly/screenshot.png';
      const causeError = new Error('Permission denied');
      const error = new ScreenkittenFileWriteError(outputPath, causeError);

      strictEqual(error.name, 'ScreenkittenFileWriteError');
      strictEqual(error.message, `Failed to write screenshot file: ${outputPath}`);
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenOperationAbortedError', () => {
    test('should create operation aborted error with default operation', () => {
      const error = new ScreenkittenOperationAbortedError();

      strictEqual(error.name, 'ScreenkittenOperationAbortedError');
      strictEqual(error.message, 'operation was aborted');
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create operation aborted error with custom operation', () => {
      const operation = 'screenshot';
      const error = new ScreenkittenOperationAbortedError(operation);

      strictEqual(error.name, 'ScreenkittenOperationAbortedError');
      strictEqual(error.message, `${operation} was aborted`);
      strictEqual(error instanceof ScreenkittenError, true);
    });
  });

  describe('ScreenkittenScreenshotFailedError', () => {
    test('should create screenshot failed error for iOS', () => {
      const error = new ScreenkittenScreenshotFailedError('ios');

      strictEqual(error.name, 'ScreenkittenScreenshotFailedError');
      strictEqual(error.message, 'IOS screenshot command failed');
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create screenshot failed error for Android', () => {
      const error = new ScreenkittenScreenshotFailedError('android');

      strictEqual(error.name, 'ScreenkittenScreenshotFailedError');
      strictEqual(error.message, 'ANDROID screenshot command failed');
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create screenshot failed error with cause', () => {
      const causeError = new Error('Command execution failed');
      const error = new ScreenkittenScreenshotFailedError('ios', causeError);

      strictEqual(error.name, 'ScreenkittenScreenshotFailedError');
      strictEqual(error.message, 'IOS screenshot command failed');
      strictEqual(error.cause, causeError);
    });
  });

  describe('ScreenkittenInvalidTypeError', () => {
    test('should create invalid type error with type', () => {
      const type = 'bmp';
      const error = new ScreenkittenInvalidTypeError(type);

      strictEqual(error.name, 'ScreenkittenInvalidTypeError');
      strictEqual(error.message, `Invalid screenshot type: ${type}. Valid types are: png, jpeg`);
      strictEqual(error instanceof ScreenkittenError, true);
    });

    test('should create invalid type error for various invalid types', () => {
      const invalidTypes = ['gif', 'webp', 'tiff', 'svg'];

      for (const type of invalidTypes) {
        const error = new ScreenkittenInvalidTypeError(type);
        strictEqual(error.message, `Invalid screenshot type: ${type}. Valid types are: png, jpeg`);
      }
    });
  });

  describe('Error inheritance', () => {
    test('all custom errors should inherit from ScreenkittenError', () => {
      const errors = [
        new ScreenkittenDeviceNotFoundError('device-123'),
        new ScreenkittenXcrunNotFoundError('/usr/bin/xcrun'),
        new ScreenkittenAdbNotFoundError('/usr/bin/adb'),
        new ScreenkittenIOSSimulatorError('booted'),
        new ScreenkittenAndroidDeviceError('emulator-5554'),
        new ScreenkittenFileWriteError('/tmp/screenshot.png'),
        new ScreenkittenOperationAbortedError('screenshot'),
        new ScreenkittenScreenshotFailedError('ios'),
        new ScreenkittenInvalidTypeError('bmp')
      ];

      for (const error of errors) {
        strictEqual(error instanceof ScreenkittenError, true);
        strictEqual(error instanceof Error, true);
      }
    });
  });
});
