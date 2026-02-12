export const metadata = {
  title: "Links Regalo",
  description: "Regalos con amor 💖",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
