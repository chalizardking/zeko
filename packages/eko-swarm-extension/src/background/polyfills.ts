import { Buffer } from 'buffer';
import process from 'process';

// Global polyfills for extension service worker
(window as any).Buffer = Buffer;
(window as any).process = process;
(window as any).global = window;

// Define process.env if missing
if (!process.env) {
  (process as any).env = {};
}
