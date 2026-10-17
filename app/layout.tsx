import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Tsime · Water that keeps flowing', description: 'Rural water, cared for. The Tsime operations workspace for water-point revival and maintenance.', manifest: '/manifest.json', icons: { icon: '/icon.svg', apple: '/icon.svg' } };
export const viewport: Viewport = { themeColor: '#173e32', width: 'device-width', initialScale: 1 };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
