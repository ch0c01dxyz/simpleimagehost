"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { DownloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function Download() {
	const [apiKey, setApiKey] = useState("");
	const [host, setHost] = useState("");

	useEffect(() => {
		setHost(window.location.host);
	}, []);

	return (
		<main className="flex flex-col items-center justify-center p-4 h-screen">
			<h1 className="text-3xl font-bold mb-2">Download Configuration Files (ShareX Only)</h1>

			<div className="flex flex-row gap-4 justify-center items-center">
				<div className="flex flex-col gap-2">
					<p className="text-sm text-muted-foreground">API Key</p>
					<div className="flex flex-row gap-2">
						<Input placeholder="API Key Here" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
						<Button variant={"outline"} size={"icon"} onClick={() => {
							const sharex_config = JSON.stringify({
								"Version": "14.0.0",
								"Name": host,
								"DestinationType": "ImageUploader",

								"RequestType": "POST",
								"RequestURL": `https://${host}/api/upload`,

								"Headers": {
									"Authorization": `Bearer ${apiKey}`
								},

								"Body": "MultipartFormData",
								"FileFormName": "file",

								"URL": "{json:url}",
								"ThumbnailURL": "{json:thumbnail_url}",
								"ErrorMessage": "{json:error}"
							});

							const sharex_config_file = new Blob([sharex_config], { type: "application/json" });
							const sharex_config_url = URL.createObjectURL(sharex_config_file);

							const download_link = document.createElement("a");
							download_link.href = sharex_config_url;
							download_link.download = `${host}_config.SXCU`;
							download_link.click();
						}}><DownloadIcon /></Button>
					</div>
				</div>

			</div>
		</main>
	)
}