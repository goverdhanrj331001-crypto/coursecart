import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BrainBridge — Learn What Moves You Forward',
  description:
    'Personalized learning for a brighter future. Get access to expert-led courses, interactive lessons, and the right support to achieve your goals.',
  openGraph: {
    title: 'BrainBridge — Learn What Moves You Forward',
    description:
      'Personalized learning for a brighter future. Get access to expert-led courses, interactive lessons, and the right support to achieve your goals.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrainBridge — Learn What Moves You Forward',
    description:
      'Personalized learning for a brighter future. Get access to expert-led courses, interactive lessons, and the right support to achieve your goals.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${caveat.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var target = window;
                  var proto = Object.getPrototypeOf(window);
                  var desc = Object.getOwnPropertyDescriptor(target, 'fetch') || Object.getOwnPropertyDescriptor(proto, 'fetch');
                  if (desc && (!desc.set || !desc.writable)) {
                    var currentFetch = window.fetch;
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return currentFetch; },
                      set: function(val) { currentFetch = val; },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-cream text-ink-soft antialiased selection:bg-amber/20 selection:text-navy"
      >
        {children}
      </body>
    </html>
  );
}

