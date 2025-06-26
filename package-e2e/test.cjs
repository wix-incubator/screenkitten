const assert = require('assert');
const {
  screenkitten,
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
} = require('screenkitten');

// Check main factory function
assert(typeof screenkitten === 'function', 'screenkitten should be a function');

// Check error classes with instanceof assertions
const baseError = new ScreenkittenError('test error');
assert(baseError instanceof Error, 'ScreenkittenError should extend Error');
assert(baseError instanceof ScreenkittenError, 'ScreenkittenError should be instanceof ScreenkittenError');

const deviceNotFoundError = new ScreenkittenDeviceNotFoundError('device-123');
assert(deviceNotFoundError instanceof ScreenkittenError, 'ScreenkittenDeviceNotFoundError should extend ScreenkittenError');

const xcrunNotFoundError = new ScreenkittenXcrunNotFoundError('/path/to/xcrun');
assert(xcrunNotFoundError instanceof ScreenkittenError, 'ScreenkittenXcrunNotFoundError should extend ScreenkittenError');

const adbNotFoundError = new ScreenkittenAdbNotFoundError('/path/to/adb');
assert(adbNotFoundError instanceof ScreenkittenError, 'ScreenkittenAdbNotFoundError should extend ScreenkittenError');

const iosSimulatorError = new ScreenkittenIOSSimulatorError('booted');
assert(iosSimulatorError instanceof ScreenkittenError, 'ScreenkittenIOSSimulatorError should extend ScreenkittenError');

const androidDeviceError = new ScreenkittenAndroidDeviceError('emulator-5554');
assert(androidDeviceError instanceof ScreenkittenError, 'ScreenkittenAndroidDeviceError should extend ScreenkittenError');

const fileWriteError = new ScreenkittenFileWriteError('/tmp/screenshot.png');
assert(fileWriteError instanceof ScreenkittenError, 'ScreenkittenFileWriteError should extend ScreenkittenError');

const operationAbortedError = new ScreenkittenOperationAbortedError('screenshot');
assert(operationAbortedError instanceof ScreenkittenError, 'ScreenkittenOperationAbortedError should extend ScreenkittenError');

const screenshotFailedError = new ScreenkittenScreenshotFailedError('ios');
assert(screenshotFailedError instanceof ScreenkittenError, 'ScreenkittenScreenshotFailedError should extend ScreenkittenError');

const invalidTypeError = new ScreenkittenInvalidTypeError('invalid');
assert(invalidTypeError instanceof ScreenkittenError, 'ScreenkittenInvalidTypeError should extend ScreenkittenError');
