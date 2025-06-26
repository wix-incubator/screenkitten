import crypto from 'node:crypto';
import path from 'node:path';
import os from 'node:os';

import type { OnErrorHandler } from './types';

/**
 * Handles errors based on the provided error handler strategy
 * @param handler - The error handling strategy ('throw', 'ignore', or a function)
 * @param error - The error to handle
 * @param result - The result to return when not throwing
 * @returns The result if not throwing, otherwise throws the error
 */
export function doHandleError<R>(handler: OnErrorHandler | undefined, error: Error, result: R): R {
  if (handler) {
    if (handler === 'throw') {
      throw error;
    } else if (handler === 'ignore') {
      return result; // Return result even though operation might have failed
    } else {
      handler(error);
      return result;
    }
  }

  throw error;
}

/**
 * Generates a unique temporary file path for screenshots
 * @param platform - The platform ('android' or 'ios')
 * @param extension - The file extension (e.g., 'png', 'jpeg')
 * @returns A unique temporary file path
 */
export function createTempScreenshotPath(platform: 'android' | 'ios', extension: string): string {
  const timestamp = Date.now();
  const uuid = crypto.randomUUID().slice(0, 8); // Use first 8 chars of UUID for brevity
  const filename = `${platform}-screenshot-${timestamp}-${uuid}.${extension}`;
  return path.join(os.tmpdir(), filename);
}
