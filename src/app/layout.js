import "./globals.css";
import HeaderImage from './favicon.ico'

export const metadata = {
    title: "Vitaliteti",
    description: "Vitaliteti",
    favicon: {HeaderImage}
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
