export type OnErrorHandler = ((error: Error) => void) | 'throw' | 'ignore';

export interface ScreenkittenOptionsBase {
  deviceId?: string;
  outputPath?: string;
  abortSignal?: AbortSignal;
  onError?: OnErrorHandler;
}

export interface ScreenkittenOptionsIOS extends ScreenkittenOptionsBase {
  platform: 'ios';
  xcrunPath?: string;
  type?: 'png' | 'jpeg';
  display?: 'internal' | 'external';
  mask?: 'ignored' | 'alpha' | 'black';
}

export interface ScreenkittenOptionsAndroid extends ScreenkittenOptionsBase {
  platform: 'android';
  adbPath?: string;
}

export interface Screenkitten {
  takeScreenshot(options?: Partial<ScreenkittenOptionsBase>): Promise<string>;
}

export type ScreenkittenOptions =
  | ScreenkittenOptionsIOS
  | ScreenkittenOptionsAndroid;
