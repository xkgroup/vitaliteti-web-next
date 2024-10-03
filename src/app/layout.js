import "./globals.css";

export const metadata = {
    title: "Vitaliteti",
    description: "Vitaliteti",
    favicon:'./img.png'
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
