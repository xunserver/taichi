/**
 * Path utility functions for handling base URL in Astro
 * When deploying to a subdirectory like /taichi/, all internal links need to include the base path
 */

// Get the base path from environment or default to '/taichi/'
// This must match the base config in astro.config.mjs
export const getBasePath = (): string => {
  const envBase = import.meta.env.ASTRO_BASE;
  if (envBase) return envBase;
  // Default to '/taichi/' to match astro.config.mjs
  return '/taichi/';
};

/**
 * Build a URL with the base path prefix
 * @param path - The path (e.g., '/about', '/zh/courses')
 * @returns Full path with base prefix (e.g., '/taichi/about', '/taichi/zh/courses')
 */
export function withBase(path: string): string {
  const base = getBasePath();

  // If base is just '/', return path as-is
  if (base === '/') {
    return path;
  }

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Ensure base ends with '/' and path doesn't start with '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}

/**
 * Generate a localized URL with base path
 * @param path - The path without locale prefix (e.g., '/about')
 * @param locale - The locale ('nl', 'en', 'zh')
 * @returns Full localized path with base prefix
 */
export function localizedPath(path: string, locale: string): string {
  // For default locale (nl), don't add prefix
  if (locale === 'nl') {
    return withBase(path);
  }

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Add locale prefix with slash
  return withBase(`/${locale}/${cleanPath}`);
}
