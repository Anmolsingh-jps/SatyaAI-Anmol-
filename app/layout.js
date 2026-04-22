export const metadata = {
  title: "Satya AI",
  description: "Sach dikhane wala AI tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0f19", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
