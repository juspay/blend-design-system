# Firebase Video Access Guide

## Overview

This document provides developers with information on accessing video files hosted on Firebase Storage for the Blend Design System website.

## Video Storage Structure

Videos are organized in Firebase Storage with the following structure:

```
firebase-storage/
└── videos/
    └── public/
        ├── demos/           # Product demonstration videos
        ├── features/        # Feature showcase videos
        └── assets/
            ├── thumbnails/  # Video thumbnail images
            └── compressed/  # Optimized/compressed versions
```

## Security Model

- **Read-Only Access**: All public videos are accessible for reading only
- **No Upload Permissions**: Public users cannot upload, modify, or delete videos
- **Path Restrictions**: Only `/videos/public/` path allows public read access
- **Default Deny**: All other paths are completely restricted

## Accessing Videos

### Base URL Pattern

```
https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/videos%2Fpublic%2F[PATH]?alt=media
```

### URL Encoding

Firebase Storage URLs require proper encoding:

- Forward slashes (`/`) become `%2F`
- Spaces become `%20`
- Other special characters should be URL encoded

### Example URLs

```javascript
// Demo video
const demoVideoUrl =
    'https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/videos%2Fpublic%2Fdemos%2Fproduct-demo.mp4?alt=media'

// Feature showcase
const featureVideoUrl =
    'https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/videos%2Fpublic%2Ffeatures%2Ffeature-showcase.mp4?alt=media'

// Thumbnail
const thumbnailUrl =
    'https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/videos%2Fpublic%2Fassets%2Fthumbnails%2Fproduct-demo-thumb.jpg?alt=media'
```

## Implementation Examples

### Basic HTML Video Element

```html
<video controls width="100%" poster="[THUMBNAIL_URL]">
    <source src="[FIREBASE_VIDEO_URL]" type="video/mp4" />
    Your browser does not support the video tag.
</video>
```

### React Component Example

```jsx
import React from 'react'

const VideoPlayer = ({ videoPath, thumbnailPath, title }) => {
    const baseUrl =
        'https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/'
    const videoUrl = `${baseUrl}videos%2Fpublic%2F${encodeURIComponent(videoPath)}?alt=media`
    const posterUrl = thumbnailPath
        ? `${baseUrl}videos%2Fpublic%2F${encodeURIComponent(thumbnailPath)}?alt=media`
        : undefined

    return (
        <video controls width="100%" poster={posterUrl} aria-label={title}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

// Usage
;<VideoPlayer
    videoPath="demos/product-demo.mp4"
    thumbnailPath="assets/thumbnails/product-demo-thumb.jpg"
    title="Product Demo Video"
/>
```

### JavaScript Utility Function

```javascript
/**
 * Generate Firebase Storage URL for video assets
 * @param {string} path - Path relative to videos/public/
 * @returns {string} Complete Firebase Storage URL
 */
function getVideoUrl(path) {
    const baseUrl =
        'https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/'
    const encodedPath = `videos%2Fpublic%2F${encodeURIComponent(path)}`
    return `${baseUrl}${encodedPath}?alt=media`
}

// Usage examples
const demoVideo = getVideoUrl('demos/product-demo.mp4')
const thumbnail = getVideoUrl('assets/thumbnails/product-demo-thumb.jpg')
```

## Performance Considerations

### Caching

- Videos are cached for 30 days (`max-age=2592000`)
- Thumbnails and images cached for 1 day
- Use `Accept-Ranges: bytes` for progressive loading

### Optimization Tips

1. **Preload thumbnails**: Load poster images first for better UX
2. **Lazy loading**: Only load videos when needed (intersection observer)
3. **Progressive enhancement**: Provide fallback content
4. **Multiple formats**: Consider WebM for better compression (if available)

### Example with Lazy Loading

```javascript
const videoElement = document.querySelector('video[data-src]')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const video = entry.target
            video.src = video.dataset.src
            video.load()
            observer.unobserve(video)
        }
    })
})

observer.observe(videoElement)
```

## Security Guidelines

### Content Security Policy

The website's CSP allows Firebase Storage as a media source:

```
media-src 'self' https://firebasestorage.googleapis.com;
```

### Best Practices

1. **Validate URLs**: Ensure URLs point to expected Firebase Storage domain
2. **No sensitive content**: Videos should not contain confidential information
3. **Monitor usage**: Track bandwidth and access patterns
4. **Regular audits**: Review access logs and usage metrics

## Troubleshooting

### Common Issues

1. **404 Not Found**: Check path encoding and file existence
2. **CORS Errors**: Firebase Storage handles CORS automatically
3. **Slow Loading**: Consider video compression and CDN caching
4. **Access Denied**: Verify path is under `/videos/public/`

### Debug URLs

Test video accessibility by opening URLs directly in browser:

```
https://firebasestorage.googleapis.com/v0/b/storybook-452807.appspot.com/o/videos%2Fpublic%2Fdemos%2Fyour-video.mp4?alt=media
```

## Upload Process (Admin Only)

Videos must be uploaded by authorized administrators using:

### Firebase CLI

```bash
# Login to Firebase
firebase login

# Upload video
firebase storage:upload ./local-video.mp4 videos/public/demos/video-name.mp4

# Upload thumbnail
firebase storage:upload ./thumbnail.jpg videos/public/assets/thumbnails/video-name-thumb.jpg
```

### Firebase Console

1. Go to Firebase Console → Storage
2. Navigate to `videos/public/demos/` or appropriate folder
3. Upload files manually

## Support

For questions or issues with video access:

1. Check this documentation first
2. Verify URL encoding and paths
3. Test direct URL access in browser
4. Contact the development team for Firebase Storage access issues

---

**Last Updated**: February 2026  
**Firebase Project**: `storybook-452807`  
**Storage Bucket**: `storybook-452807.appspot.com`
