import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { settings } from "../../settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: settings.site.Title,
	description: settings.site.Description,
};

export const viewport: Viewport = {
	themeColor: settings.embed_data.Color ? settings.embed_data.Color : "#7289da",
	colorScheme: "dark"
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
