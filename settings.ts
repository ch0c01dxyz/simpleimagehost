
// Dynamic Variables
// %file_name%
// %file_size%
// %uploaded_files%
// %file_upload_timestamp%

export const settings = {
    embed_data: {
        "Site Name": "Di upload pada: %file_upload_timestamp%",
        "Title": "MStoreBot | %file_name%",
        "Description": "Ukuran: %file_size% - %uploaded_files% total file",
        "Color": "#7289da",
    },
    site: {
        "Title": "MStoreBot Simple ImageHost",
        "Description": "Yet another simple imagehost",
        "Show Credits": true,
    },
    page_redirect: "https://simpleimghost.vercel.app/"
}

export const upload_limit = 10; // MB

// If you want to change the api key, use https://generate-random.org/api-keys to generate it and change it
export const api_key = "mstorebot_VybPIpV76OHCrItevHCUmwKm5k7c09pcuChqASPkivhTqu4PxyZa1GoRF9cXKaxgiA4NCdnNE4AcB4kUnMq0qcqvc9DI8zBAmzK2U0sHNYHnzcNySHtCIJxu40W3G4GhgsiJ5JBF06ALt79xOdUvYMwuharVLtzrCNAqRkx5CSAFYjbwskwcoDY2yuXJaRw9YF6ix62SMGVSe7qDIUP6qSIrYUqNg1clcXXL65r4XpMcQrEfh9HNdSeOLQxLvBsQ";

// Image file expiration time in minutes
// Default: 5 minutes
export const image_expiration_minutes = 5;