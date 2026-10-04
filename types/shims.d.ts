declare module 'next' {
  import type { ComponentType, ReactNode } from 'react';

  export type Metadata = {
    title?: string;
    description?: string;
    keywords?: string[] | string;
    authors?: Array<{ name?: string; url?: string }>;
    creator?: string;
    publisher?: string;
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      images?: unknown[];
      locale?: string;
      type?: string;
    };
    twitter?: {
      card?: string;
      title?: string;
      description?: string;
      images?: unknown[];
      creator?: string;
    };
    robots?: unknown;
    icons?: unknown;
    manifest?: string;
    [key: string]: unknown;
  };

  export type NextConfig = Record<string, unknown> & {
    reactStrictMode?: boolean;
    eslint?: { ignoreDuringBuilds?: boolean };
    typescript?: { ignoreBuildErrors?: boolean };
    images?: Record<string, unknown>;
    output?: string;
    transpilePackages?: string[];
    webpack?: (
      config: Record<string, unknown>,
      ctx: { dev?: boolean; [key: string]: unknown }
    ) => Record<string, unknown>;
    [key: string]: unknown;
  };

  export function headers(): Promise<{ get: (key: string) => string | undefined; [key: string]: unknown }>;
  export const NextResponse: unknown;
  export const NextRequest: unknown;
}

declare module 'next/font/google' {
  type FontOptions = {
    subsets?: string[];
    weight?: string | string[];
    style?: string | string[];
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    variable?: string;
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean;
    axes?: string[];
  };
  type FontResult = { className: string; variable: string; style: Record<string, unknown> };
  type FontLoader = (options?: FontOptions) => FontResult;

  export const Inter: FontLoader;
  export const Poppins: FontLoader;
  export const Fraunces: FontLoader;
  export const Plus_Jakarta_Sans: FontLoader;
  export const JetBrains_Mono: FontLoader;
  export const Caveat: FontLoader;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: (url: string) => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): unknown;
  export function useParams<T = Record<string, string | string[]>>(): T;
  export function redirect(url: string): never;
  export function permanentRedirect(url: string): never;
}

declare module 'next/link' {
  import type { ComponentType, ReactNode } from 'react';

  interface LinkProps {
    href: string;
    children?: ReactNode;
    className?: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    target?: string;
    rel?: string;
    onClick?: (e: unknown) => void;
    [key: string]: unknown;
  }

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import type { ComponentType } from 'react';

  interface ImageProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    className?: string;
    style?: Record<string, unknown>;
    sizes?: string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    quality?: number;
    objectFit?: string;
    objectPosition?: string;
    referrerPolicy?: string;
    unoptimized?: boolean;
    onLoad?: (e: unknown) => void;
    onError?: (e: unknown) => void;
    [key: string]: unknown;
  }

  const Image: ComponentType<ImageProps>;
  export default Image;
}

