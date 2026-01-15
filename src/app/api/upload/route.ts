import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { upload_limit, api_key } from "../../../../settings";

function randomString(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
	  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export async function POST(req: NextRequest) {
	const effectiveApiKey = process.env["API_KEY"] || api_key;

	if (!effectiveApiKey) {
		return NextResponse.json({
			error: "API key not configured.",
		}, { status: 500 })
	}

	if (req.headers.get("Authorization") !== `Bearer ${effectiveApiKey}`) {
		return NextResponse.json({
			error: "Unauthorized",
		}, { status: 401 })
	}

	let files;
	try {
		files = await req.formData();
	} catch {
		return NextResponse.json({
			error: "Invalid request. Please send multipart/form-data with a 'file' field.",
		}, { status: 400 })
	}

	const file = files.get("file") as Blob;

	if (!file || !(file instanceof Blob) || file.size === 0) {
		return NextResponse.json({
			error: "No file found. Please upload a file using the 'file' field.",
		}, { status: 400 })
	}

	if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/gif" && file.type !== "image/webp") {
		return NextResponse.json({
			error: "Only PNG, JPEG, GIF, or WebP files are allowed.",
		}, { status: 400 });
	}

	if (file.size > upload_limit * 1024 * 1024) {
		return NextResponse.json({
			error: `File size exceeds the allowed limit of ${upload_limit}MB.`,
		}, { status: 400 });
	}

	const file_name = randomString(10);
	const file_extension = file.type.split("/")[1];
	const full_filename = `${file_name}.${file_extension}`;

	let url: string;

	try {
		const result = await put(full_filename, file, { access: 'public' });

		url = result.url;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";

		if (message.includes("No token found")) {
			return NextResponse.json({
				error: "Blob storage not configured. Please set up Vercel Blob and ensure BLOB_READ_WRITE_TOKEN is set.",
			}, { status: 500 });
		}

		return NextResponse.json({
			error: `Upload failed: ${message}`,
		}, { status: 500 });
	}

	const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${req.nextUrl.host}`;

	return NextResponse.json({
		success: true,
		url: `${host}/${file_name}`,
		direct_url: url,
		filename: full_filename,
	});
}