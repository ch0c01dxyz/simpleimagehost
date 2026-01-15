import { list } from "@vercel/blob"
import { notFound } from "next/navigation";
import { settings } from "../../../settings";
import { replace_dynamic_variables } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next/types";

function stripExtension(str: string): string {
	return str.trim().replace(/\.(png|jpg|jpeg|gif|webp)$/i, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
	const file_name = (await params).path.join("");
	const { blobs } = await list();
	const file = blobs.find(blob => stripExtension(blob.pathname) === stripExtension(file_name));

	if (!file) {
		return {
			title: "404 Not Found",
			description: "404 Not Found",
		}
	}

	return {
		title: settings.site.Title,
		description: settings.site.Description,

		openGraph: {
			title: replace_dynamic_variables(settings.embed_data.Title, file, blobs.length),
			description: replace_dynamic_variables(settings.embed_data.Description, file, blobs.length),
			images: [
				{
					url: file.url,
				},
			],

			siteName: settings.embed_data["Site Name"] ? replace_dynamic_variables(settings.embed_data["Site Name"], file, blobs.length) : undefined,
		},
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page( { params }: { params: any }) {
	const file_name = (await params).path.join("");
	const { blobs } = await list();
	const file = blobs.find(blob => stripExtension(blob.pathname) === stripExtension(file_name));

	if (!file) {
		return notFound();
	}

	return (
		<main className="flex flex-col items-center justify-center p-4 h-screen">
			<Card>
				<CardHeader>
					<CardTitle>{replace_dynamic_variables(settings.embed_data.Title, file, blobs.length)}</CardTitle>
					<CardDescription className="max-w-[25vw] text-wrap">{replace_dynamic_variables(settings.embed_data.Description, file, blobs.length)}</CardDescription>
				</CardHeader>
				<CardContent>
					<img src={file.url} alt={file.pathname} className="max-w-[25vw] object-cover" />
				</CardContent>
				<CardFooter className="flex flex-row gap-2 justify-center">
					<Link href={settings.page_redirect}>
						<Button variant="outline" size={"sm"}>Back to Home</Button>
					</Link>
					<Link href={file.url} target="_blank">
						<Button variant="outline" size={"sm"}>Open Raw</Button>
					</Link>
				</CardFooter>
			</Card>

			{settings.site["Show Credits"] == true && (
				<p className="text-xs text-muted-foreground fixed bottom-4 right-4">Made with ❤️ by <Link href="https://github.com/ch0c01dxyz" className='text-blue-400' target='_blank'>ch0c01dxyz</Link></p>
			)}
		</main>
	)
}