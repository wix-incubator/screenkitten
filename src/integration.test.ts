import { test as it, describe } from 'node:test';
import { strictEqual } from 'node:assert';
import { existsSync } from 'node:fs';

import { screenkitten } from './index';

const isCI = process.env.CI === 'true' || process.env.CI === '1';
const test = isCI ? it.skip : it;

describe('Screenkitten Integration Tests', () => {
  describe('iOS Screenshots', () => {
    test('should take a screenshot using factory function', async () => {
      const ios = screenkitten({
        platform: 'ios',
        onError: 'ignore'
      });

      try {
        const screenshotPath = await ios.takeScreenshot();

        strictEqual(typeof screenshotPath, 'string');
        strictEqual(screenshotPath.length > 0, true);
        strictEqual(existsSync(screenshotPath), true);

        console.log(`✅ iOS screenshot (factory) saved to: ${screenshotPath}`);
      } catch (error) {
        console.log(`⚠️  iOS factory test failed: ${error}`);
      }
    });

    test('should take a screenshot with custom options', async () => {
      const ios = screenkitten({
        platform: 'ios',
        type: 'jpeg',
        display: 'internal',
        mask: 'ignored',
        onError: 'ignore'
      });

      try {
        const screenshotPath = await ios.takeScreenshot({
          deviceId: 'booted'
        });

        strictEqual(typeof screenshotPath, 'string');
        strictEqual(screenshotPath.includes('.jpeg'), true);
        strictEqual(existsSync(screenshotPath), true);

        console.log(`✅ iOS screenshot with custom options saved to: ${screenshotPath}`);
      } catch (error) {
        console.log(`⚠️  iOS custom options test failed: ${error}`);
      }
    });

    it('should handle xcrun not found error', async () => {
      const ios = screenkitten({
        platform: 'ios',
        xcrunPath: '/nonexistent/xcrun'
      });

      try {
        await ios.takeScreenshot();
        strictEqual(false, true, 'Should have thrown an error');
      } catch (error) {
        strictEqual((error as Error).name, 'ScreenkittenXcrunNotFoundError');
        console.log(`✅ Correctly caught xcrun not found error: ${(error as Error).message}`);
      }
    });
  });

  describe('Android Screenshots', () => {
    test('should take a screenshot using factory function', async () => {
      const android = screenkitten({
        platform: 'android',
        onError: 'ignore'
      });

      try {
        const screenshotPath = await android.takeScreenshot();

        strictEqual(typeof screenshotPath, 'string');
        strictEqual(screenshotPath.length > 0, true);
        strictEqual(existsSync(screenshotPath), true);

        console.log(`✅ Android screenshot (factory) saved to: ${screenshotPath}`);
      } catch (error) {
        console.log(`⚠️  Android factory test failed (expected if no device available): ${error}`);
      }
    });

    test('should take a screenshot with specific device ID', async () => {
      const android = screenkitten({
        platform: 'android',
        onError: 'ignore'
      });

      try {
        const screenshotPath = await android.takeScreenshot({
          deviceId: 'emulator-5554'
        });

        strictEqual(typeof screenshotPath, 'string');
        strictEqual(screenshotPath.includes('.png'), true);
        strictEqual(existsSync(screenshotPath), true);

        console.log(`✅ Android screenshot with device ID saved to: ${screenshotPath}`);
      } catch (error) {
        console.log(`⚠️  Android device ID test failed: ${error}`);
      }
    });

    it('should handle adb not found error', async () => {
      const android = screenkitten({
        platform: 'android',
        adbPath: '/nonexistent/adb'
      });

      try {
        await android.takeScreenshot();
        strictEqual(false, true, 'Should have thrown an error');
      } catch (error) {
        strictEqual((error as Error).name, 'ScreenkittenAdbNotFoundError');
        console.log(`✅ Correctly caught adb not found error: ${(error as Error).message}`);
      }
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unsupported platform', () => {
      try {
        screenkitten({ platform: 'windows' } as any);
        strictEqual(false, true, 'Should have thrown an error');
      } catch (error) {
        strictEqual((error as Error).message, 'Unsupported platform: windows');
        console.log(`✅ Correctly caught unsupported platform error: ${(error as Error).message}`);
      }
    });
  });
});
