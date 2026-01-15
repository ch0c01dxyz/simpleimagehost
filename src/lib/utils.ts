import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn ( ...inputs: ClassValue[] )
{
	return twMerge ( clsx ( inputs ) )
}

export function replace_dynamic_variables ( str: string, file_data: { pathname: string, size: number, uploadedAt: Date }, uploaded_files: number )
{
	return str.replaceAll ( "%file_name%", file_data.pathname ).replaceAll ( "%file_size%", Math.floor ( ( file_data.size / 1024 / 1024 ) * 100 ) / 100 + "MB" ).replaceAll ( "%uploaded_files%", uploaded_files.toString () ).replaceAll ( "%file_upload_timestamp%", file_data.uploadedAt.toUTCString () );
}