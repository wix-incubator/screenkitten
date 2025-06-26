import {
  screenkitten,
  ScreenkittenOptions,
  ScreenkittenOptionsIOS,
  ScreenkittenOptionsAndroid,
  ScreenkittenOptionsBase,
  Screenkitten,
  OnErrorHandler,
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
} from 'screenkitten';

declare function assertType<T>(value: T): T;

// Test main screenkitten factory function
assertType<typeof screenkitten>(screenkitten);

// Test iOS instance creation
const iosInstance = screenkitten({
  platform: 'ios',
  deviceId: 'booted',
  xcrunPath: '/usr/bin/xcrun',
  type: 'png',
  display: 'internal',
  mask: 'ignored',
  outputPath: '/tmp/screenshot.png',
  onError: 'throw'
});
assertType<Screenkitten>(iosInstance);

// Test Android instance creation
const androidInstance = screenkitten({
  platform: 'android',
  deviceId: 'emulator-5554',
  adbPath: '/usr/bin/adb',
  outputPath: '/tmp/screenshot.png',
  onError: 'ignore'
});
assertType<Screenkitten>(androidInstance);

// Test option interfaces
assertType<ScreenkittenOptionsIOS>({
  platform: 'ios',
  deviceId: 'booted',
  xcrunPath: '/usr/bin/xcrun',
  type: 'png',
  display: 'internal',
  mask: 'ignored',
  outputPath: '/tmp/screenshot.png',
  onError: 'throw'
});

assertType<ScreenkittenOptionsAndroid>({
  platform: 'android',
  deviceId: 'emulator-5554',
  adbPath: '/usr/bin/adb',
  outputPath: '/tmp/screenshot.png',
  onError: 'ignore'
});

assertType<ScreenkittenOptionsBase>({
  deviceId: 'test-device',
  outputPath: '/tmp/screenshot.png',
  abortSignal: new AbortController().signal,
  onError: 'throw'
});

// Test OnErrorHandler types
assertType<OnErrorHandler>('throw');
assertType<OnErrorHandler>('ignore');
assertType<OnErrorHandler>((error: Error) => console.error(error));

// Test Screenkitten interface
const dummyScreenkitten: Screenkitten = {
  takeScreenshot: async (options?: Partial<ScreenkittenOptionsBase>) => '/path/to/screenshot.png'
};
assertType<Screenkitten>(dummyScreenkitten);

// Test method signatures
assertType<Promise<string>>(iosInstance.takeScreenshot());
assertType<Promise<string>>(iosInstance.takeScreenshot({
  deviceId: 'specific-device',
  outputPath: '/custom/path.png'
}));

assertType<Promise<string>>(androidInstance.takeScreenshot());
assertType<Promise<string>>(androidInstance.takeScreenshot({
  deviceId: 'emulator-5554',
  outputPath: '/custom/path.png'
}));

// Test error classes
assertType<Error>(new ScreenkittenError('test error'));
assertType<ScreenkittenError>(new ScreenkittenDeviceNotFoundError('device-123'));
assertType<ScreenkittenError>(new ScreenkittenXcrunNotFoundError('/path/to/xcrun'));
assertType<ScreenkittenError>(new ScreenkittenAdbNotFoundError('/path/to/adb'));
assertType<ScreenkittenError>(new ScreenkittenIOSSimulatorError('booted'));
assertType<ScreenkittenError>(new ScreenkittenAndroidDeviceError('emulator-5554'));
assertType<ScreenkittenError>(new ScreenkittenFileWriteError('/tmp/screenshot.png'));
assertType<ScreenkittenError>(new ScreenkittenOperationAbortedError('screenshot'));
assertType<ScreenkittenError>(new ScreenkittenScreenshotFailedError('ios'));
assertType<ScreenkittenError>(new ScreenkittenInvalidTypeError('invalid'));

// Test union types
assertType<ScreenkittenOptions>({
  platform: 'ios',
  xcrunPath: '/usr/bin/xcrun',
  type: 'png'
});

assertType<ScreenkittenOptions>({
  platform: 'android',
  adbPath: '/usr/bin/adb'
});