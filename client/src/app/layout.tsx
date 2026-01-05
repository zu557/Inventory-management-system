import "./globals.css";

import Providers from "./providers"

// app/layout.tsx



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
