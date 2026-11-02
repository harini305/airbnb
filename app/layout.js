import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/figtree";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3400"),
  title: {
    default: "Airbnb Services: Book Chefs, Massage Therapists, Photographers & More",
    template: "%s · Airbnb Services",
  },
  description:
    "Discover Airbnb Services and instantly book local professionals to elevate your next trip. Find trusted chefs, trainers, wellness experts, photographers and more.",
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
