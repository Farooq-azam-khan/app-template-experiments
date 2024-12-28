import { WebVitals } from "@/components/web-vitals";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <WebVitals />
      {children}
    </div>
  );
}
