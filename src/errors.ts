/**
 * Base error class for Screenkitten errors
 */
export class ScreenkittenError extends Error {
  constructor(message: string, options?: { cause?: Error }) {
    super(message, options);
    this.name = 'ScreenkittenError';
  }
}

/**
 * Error thrown when a device is not found
 */
export class ScreenkittenDeviceNotFoundError extends ScreenkittenError {
  constructor(deviceId: string, cause?: Error) {
    super(`Device not found: ${deviceId}`, { cause });
    this.name = 'ScreenkittenDeviceNotFoundError';
  }
}

/**
 * Error thrown when xcrun tool is not found or not executable
 */
export class ScreenkittenXcrunNotFoundError extends ScreenkittenError {
  constructor(xcrunPath: string, cause?: Error) {
    super(`xcrun not found at path: ${xcrunPath}`, { cause });
    this.name = 'ScreenkittenXcrunNotFoundError';
  }
}

/**
 * Error thrown when adb tool is not found or not executable
 */
export class ScreenkittenAdbNotFoundError extends ScreenkittenError {
  constructor(adbPath: string, cause?: Error) {
    super(`adb not found at path: ${adbPath}`, { cause });
    this.name = 'ScreenkittenAdbNotFoundError';
  }
}

/**
 * Error thrown when iOS simulator is not available
 */
export class ScreenkittenIOSSimulatorError extends ScreenkittenError {
  constructor(deviceId: string, cause?: Error) {
    super(`iOS Simulator not available or not booted: ${deviceId}`, { cause });
    this.name = 'ScreenkittenIOSSimulatorError';
  }
}

/**
 * Error thrown when Android device/emulator is not available
 */
export class ScreenkittenAndroidDeviceError extends ScreenkittenError {
  constructor(deviceId: string, cause?: Error) {
    super(`Android device/emulator not available: ${deviceId}`, { cause });
    this.name = 'ScreenkittenAndroidDeviceError';
  }
}

/**
 * Error thrown when screenshot file cannot be written
 */
export class ScreenkittenFileWriteError extends ScreenkittenError {
  constructor(outputPath: string, cause?: Error) {
    super(`Failed to write screenshot file: ${outputPath}`, { cause });
    this.name = 'ScreenkittenFileWriteError';
  }
}

/**
 * Error thrown when operation is aborted
 */
export class ScreenkittenOperationAbortedError extends ScreenkittenError {
  constructor(operation: string = 'operation') {
    super(`${operation} was aborted`);
    this.name = 'ScreenkittenOperationAbortedError';
  }
}

/**
 * Error thrown when screenshot command fails with unknown error
 */
export class ScreenkittenScreenshotFailedError extends ScreenkittenError {
  constructor(platform: 'ios' | 'android', cause?: Error) {
    super(`${platform.toUpperCase()} screenshot command failed`, { cause });
    this.name = 'ScreenkittenScreenshotFailedError';
  }
}

/**
 * Error thrown when invalid screenshot type is specified (iOS only)
 */
export class ScreenkittenInvalidTypeError extends ScreenkittenError {
  constructor(type: string) {
    super(`Invalid screenshot type: ${type}. Valid types are: png, jpeg`);
    this.name = 'ScreenkittenInvalidTypeError';
  }
}
