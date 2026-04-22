import './globals.css';

export const metadata = {
  title: 'Satya AI',
  description: 'AI reality check and news explainer in simple Hindi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
