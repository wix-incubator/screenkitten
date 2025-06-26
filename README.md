# Screenkitten 📱📸

A cross-platform Node.js library for taking screenshots on iOS simulators and Android devices/emulators.

## Features

- 🍎 **iOS Simulator Support** - Take screenshots using `xcrun simctl`
- 🤖 **Android Device/Emulator Support** - Take screenshots using `adb`
- 🔄 **Cross-platform** - Unified API for both platforms
- 📁 **Flexible Output** - Save to custom paths or auto-generate temp files
- ⚡ **AbortController Support** - Cancel operations gracefully
- 🎯 **TypeScript** - Full type safety and IntelliSense
- 🔧 **Configurable** - Extensive options for both platforms
- 🚨 **Rich Error Handling** - Detailed error types with proper inheritance

## Installation

```bash
npm install screenkitten
```

## Quick Start

### iOS Simulator

```typescript
import { screenkitten } from 'screenkitten';

const ios = screenkitten({
  platform: 'ios',
  deviceId: 'booted', // Default: 'booted'
  type: 'png', // Default: 'png'
  outputPath: '/path/to/screenshot.png' // Optional: auto-generated if not provided
});

const screenshotPath = await ios.takeScreenshot();
console.log(`Screenshot saved to: ${screenshotPath}`);
```

### Android Device/Emulator

```typescript
import { screenkitten } from 'screenkitten';

const android = screenkitten({
  platform: 'android',
  deviceId: 'emulator-5554', // Optional: uses 'booted' by default
  outputPath: '/path/to/screenshot.png' // Optional: auto-generated if not provided
});

const screenshotPath = await android.takeScreenshot();
console.log(`Screenshot saved to: ${screenshotPath}`);
```

## API Reference

### Factory Function

#### `screenkitten(options: ScreenkittenOptions)`

Creates a platform-specific screenshot instance.

**Parameters:**
- `options` - Configuration object (see platform-specific options below)

**Returns:** `ScreenkittenIOS` or `ScreenkittenAndroid` instance

### iOS Options

```typescript
interface ScreenkittenOptionsIOS {
  platform: 'ios';
  deviceId?: string;        // Default: 'booted'
  xcrunPath?: string;       // Default: '/usr/bin/xcrun'
  type?: 'png' | 'jpeg';    // Default: 'png'
  display?: 'internal' | 'external'; // Default: 'internal'
  mask?: 'ignored' | 'alpha' | 'black'; // Default: 'ignored'
  outputPath?: string;      // Auto-generated if not provided
  abortSignal?: AbortSignal;
  onError?: OnErrorHandler;
}
```

### Android Options

```typescript
interface ScreenkittenOptionsAndroid {
  platform: 'android';
  deviceId?: string;        // Default: 'booted'
  adbPath?: string;         // Default: 'adb'
  outputPath?: string;      // Auto-generated if not provided
  abortSignal?: AbortSignal;
  onError?: OnErrorHandler;
}
```

### Error Handling

You can control error behavior using the `onError` option:

```typescript
type OnErrorHandler = 'throw' | 'ignore' | ((error: Error) => void);
```

**Options:**
- `'throw'` (default) - Throws the error
- `'ignore'` - Suppresses the error and returns the output path
- `function` - Custom error handler function

```typescript
// Custom error handling
const ios = screenkitten({
  platform: 'ios',
  onError: (error) => {
    console.error('Screenshot failed:', error.message);
    // Custom logging, reporting, etc.
  }
});
```

### Instance Methods

#### `takeScreenshot(options?: Partial<ScreenkittenOptionsBase>): Promise<string>`

Takes a screenshot and returns the path to the saved file.

**Parameters:**
- `options` - Optional override options for this specific screenshot

**Returns:** Promise that resolves to the screenshot file path

**Example:**
```typescript
// Use instance defaults
const path1 = await ios.takeScreenshot();

// Override specific options for this screenshot
const path2 = await ios.takeScreenshot({
  outputPath: '/custom/path.png',
  deviceId: 'specific-device'
});
```

### Abort Controller Support

Cancel screenshot operations gracefully:

```typescript
const controller = new AbortController();

const ios = screenkitten({
  platform: 'ios',
  abortSignal: controller.signal
});

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const path = await ios.takeScreenshot();
  console.log('Screenshot saved:', path);
} catch (error) {
  if (error.name === 'ScreenkittenOperationAbortedError') {
    console.log('Screenshot was cancelled');
  }
}
```

## Error Types

Screenkitten provides specific error types for different failure scenarios:

```typescript
import {
  ScreenkittenError,                    // Base error class
  ScreenkittenDeviceNotFoundError,      // Device/simulator not found
  ScreenkittenXcrunNotFoundError,       // xcrun tool not found (iOS)
  ScreenkittenAdbNotFoundError,         // adb tool not found (Android)
  ScreenkittenIOSSimulatorError,        // iOS simulator not available
  ScreenkittenAndroidDeviceError,       // Android device not available
  ScreenkittenFileWriteError,           // Failed to write screenshot file
  ScreenkittenOperationAbortedError,    // Operation was aborted
  ScreenkittenScreenshotFailedError,    // Generic screenshot failure
  ScreenkittenInvalidTypeError          // Invalid screenshot type (iOS)
} from 'screenkitten';
```

All errors extend the base `ScreenkittenError` class, which extends the standard `Error` class.

## Requirements

### iOS
- macOS with Xcode and iOS Simulator
- `xcrun` tool (usually available at `/usr/bin/xcrun`)

### Android
- Android SDK with `adb` tool
- Android device connected or emulator running

## CommonJS Support

Screenkitten supports both ES modules and CommonJS:

```javascript
// ES modules
import { screenkitten } from 'screenkitten';

// CommonJS
const { screenkitten } = require('screenkitten');
```

## License

MIT

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).
