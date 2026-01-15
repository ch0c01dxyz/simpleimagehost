import { NextRequest, NextResponse } from "next/server";
import { list, del } from "@vercel/blob";
import { image_expiration_minutes } from "../../../../settings";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const expirationMs = image_expiration_minutes * 60 * 1000;
	const now = Date.now();
	let deletedCount = 0;
	let cursor: string | undefined;

	do {
		const { blobs, hasMore, cursor: nextCursor } = await list({ cursor });

		const expiredBlobs = blobs.filter(blob => {
			const uploadedAt = new Date(blob.uploadedAt).getTime();
			return (now - uploadedAt) > expirationMs;
		});

		if (expiredBlobs.length > 0) {
			const urlsToDelete = expiredBlobs.map(blob => blob.url);
			await del(urlsToDelete);
			deletedCount += expiredBlobs.length;
		}

		cursor = hasMore ? nextCursor : undefined;
	} while (cursor);

	return NextResponse.json({
		success: true,
		deleted: deletedCount,
		expiration_minutes: image_expiration_minutes,
	});
}
