/**
 * Trusted Types Policy for DOM-based XSS protection
 * This implements the Trusted Types API to prevent unsafe DOM manipulation
 */

// Type declarations for Trusted Types API
interface TrustedTypePolicyOptions {
  createHTML?: (html: string) => string;
  createScript?: (script: string) => string;
  createScriptURL?: (url: string) => string;
}

interface TrustedTypePolicy {
  createHTML(html: string): any;
  createScript(script: string): any;
  createScriptURL(url: string): any;
}

declare global {
  interface Window {
    trustedTypes?: {
      createPolicy(name: string, policy: TrustedTypePolicyOptions): TrustedTypePolicy;
    };
  }
}

// Check if Trusted Types are supported
const isTrustedTypesSupported = typeof window !== 'undefined' && 'trustedTypes' in window;

// Create a Trusted Types policy if supported
let trustedTypesPolicy: TrustedTypePolicy | null = null;

if (isTrustedTypesSupported && window.trustedTypes) {
  try {
    trustedTypesPolicy = window.trustedTypes.createPolicy('default', {
      createHTML: (string: string) => {
        // Sanitize HTML string - basic implementation
        // In production, consider using DOMPurify or similar library
        const div = document.createElement('div');
        div.textContent = string;
        return div.innerHTML;
      },
      createScript: (string: string) => {
        // For scripts, we should be very restrictive
        // Only allow specific safe patterns if needed
        throw new Error('Direct script creation is not allowed. Use safe methods instead.');
      },
      createScriptURL: (string: string) => {
        // Validate script URLs
        if (string.startsWith('/') || string.startsWith('./') || string.startsWith('../')) {
          return string;
        }
        throw new Error('Only relative script URLs are allowed.');
      },
    });
  } catch (error) {
    console.warn('Failed to create Trusted Types policy:', error);
  }
}

/**
 * Safe HTML creation using Trusted Types
 */
export function createSafeHTML(html: string): any {
  if (trustedTypesPolicy) {
    return trustedTypesPolicy.createHTML(html);
  }
  // Fallback for browsers without Trusted Types support
  return html;
}

/**
 * Safe script URL creation using Trusted Types
 */
export function createSafeScriptURL(url: string): any {
  if (trustedTypesPolicy) {
    return trustedTypesPolicy.createScriptURL(url);
  }
  return url;
}

/**
 * Check if Trusted Types are enabled
 */
export function isTrustedTypesEnabled(): boolean {
  return isTrustedTypesSupported && trustedTypesPolicy !== null;
}

