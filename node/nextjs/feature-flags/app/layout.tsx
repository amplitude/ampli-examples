// Keep existing fonts, metadata, authentication and providers when merging.
import type { ReactNode } from 'react';
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><main>{children}</main></body></html>;
}
