import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DiscordEmbedProps {
	title?: string
	description?: string
	author?: {
		name: string
		iconUrl?: string
	}
	thumbnail?: string
	color?: string
	fields?: Array<{
		name: string
		value: string
		inline?: boolean
	}>
	footer?: {
		text: string
		iconUrl?: string
	}
	timestamp?: string
	image?: string
}

export function DiscordEmbedViewer({
	title,
	description,
	author,
	thumbnail,
	color = '#2f3136',
	fields,
	footer,
	timestamp,
	image,
}: DiscordEmbedProps) {
	return (
		<Card className="max-w-[512px] bg-[#36393f] text-white overflow-hidden rounded-sm">
			<CardContent className="p-4 relative">
				<div className="absolute top-0 left-0 h-full w-1" style={{ backgroundColor: color }} />
				<div className="flex flex-col space-x-4">
					<div className="flex-grow">
						{author && (
							<div className="flex items-center mb-2 text-muted-foreground text-xs">
								{author.iconUrl && (
									<Avatar className="w-6 h-6 mr-2">
										<AvatarImage src={author.iconUrl} alt={author.name} />
										<AvatarFallback>{author.name[0]}</AvatarFallback>
									</Avatar>
								)}
								<span className="text-sm font-medium">{author.name}</span>
							</div>
						)}
						{title && <h3 className="text-lg font-semibold mb-2 text-blue-400">{title}</h3>}
						{description && <p className="text-sm mb-4">{description}</p>}
						{fields && fields.length > 0 && (
							<div className="grid grid-cols-2 gap-4 mb-4">
								{fields.map((field, index) => (
									<div key={index} className={field.inline ? "col-span-1" : "col-span-2"}>
										<h4 className="text-sm font-semibold">{field.name}</h4>
										<p className="text-sm">{field.value}</p>
									</div>
								))}
							</div>
						)}
						{(footer || timestamp) && (
							<div className="flex items-center text-xs text-gray-400">
								{footer && (
									<>
										{footer.iconUrl && (
											<Avatar className="w-5 h-5 mr-2">
												<AvatarImage src={footer.iconUrl} alt="Footer icon" />
												<AvatarFallback>F</AvatarFallback>
											</Avatar>
										)}
										<span className="mr-2">{footer.text}</span>
									</>
								)}
								{timestamp && <span>{new Date(timestamp).toLocaleString()}</span>}
							</div>
						)}
					</div>
					{thumbnail && (
						<div className="flex-shrink-0">
							<img src={thumbnail} alt="Thumbnail" className="w-20 h-20 rounded-md object-cover" />
						</div>
					)}

				</div>
				{image && (
					<img src={image} alt="Image" className="px-2 py-1 rounded-md object-cover" />
				)}
			</CardContent>
		</Card>
	)
}