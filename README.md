# Social Media API Endpoint

A robust API endpoint service for social media content download and information retrieval, primarily designed for WhatsApp bot integration.

## Features

- **Multiple Platform Support:**
  - Facebook video downloads
  - Instagram stories retrieval
  - TikTok video downloads
  - Twitter/X media downloads
  - YouTube MP3/MP4 downloads
  - NPM package search
  - Pornhub video information

## API Endpoints

### Server Information
```
GET /api/server-info
```
Returns current server information and owner details.

### Facebook Download
```
GET /api/facebook?url={facebook_video_url}
```
Downloads videos from Facebook.

### Instagram Stories
```
GET /api/instagram?username={instagram_username}
```
Retrieves Instagram stories for a given username.

### TikTok Download
```
GET /api/tiktok?url={tiktok_video_url}
```
Downloads videos from TikTok.

### Twitter/X Download
```
GET /api/twitter?url={twitter_post_url}
```
Downloads media from Twitter/X posts.

### YouTube Downloads
```
GET /api/yt-mp4?url={youtube_video_url}
```
Downloads YouTube videos in MP4 format.

```
GET /api/yt-mp3?url={youtube_video_url}
```
Downloads YouTube videos in MP3 format.

### NPM Search
```
GET /api/npmsearch?url={search_query}
```
Searches for NPM packages.

### URL Validation
```
GET /api/validate-url?url={url_to_validate}
```
Validates URLs for supported platforms.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/M-Nimesh/Social_Media_api-endpoint.git
```

2. Install dependencies:
```bash
cd Social_Media_api-endpoint
npm install
```

3. Create a `.env` file with your configuration:
```
PORT=3000
```

4. Start the server:
```bash
npm start
```

## Dependencies

- express
- cors
- dotenv
- api-dylux
- rahad-all-downloader
- node-yt-dl
- @justalk/pornhub-api

## Error Handling

The API implements standardized error responses in the following format:
```json
{
    "success": false,
    "message": "Error description",
    "owner": "Owner Name"
}
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Created by Miyuru Nimesh✨

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
