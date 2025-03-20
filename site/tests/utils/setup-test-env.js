import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Save the original console.error function
const originalConsoleError = console.error;

console.error = (...args) => {
  if (
    args[0] &&
    typeof args[0] === "string" &&
    args[0].includes("Could not parse CSS stylesheet")
  ) {
    // Suppress the specific CSS parsing error
    return;
  }
  // Otherwise, call the original console.error
  originalConsoleError(...args);
};


