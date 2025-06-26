import type { ScreenkittenOptions } from './types';
import { ScreenkittenIOS } from './ios';
import { ScreenkittenAndroid } from './android';

/**
 * Create a Screenkitten instance based on the provided options.
 */
export function screenkitten(options: ScreenkittenOptions) {
  switch (options.platform) {
    case 'ios': {
      return new ScreenkittenIOS(options);
    }
    case 'android': {
      return new ScreenkittenAndroid(options);
    }
    default: {
      throw new Error(`Unsupported platform: ${(options as any).platform}`);
    }
  }
}

// Export types
export type * from './types';

// Export error classes
export * from './errors';