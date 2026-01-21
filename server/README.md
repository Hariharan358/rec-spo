# Server Backend

Node.js backend server with Express, MongoDB, and Cloudinary integration for image management.

## Features

- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Cloudinary** - Cloud-based image storage and transformation
- **Image Upload** - Secure file upload with validation
- **Rate Limiting** - Protection against abuse
- **CORS** - Cross-origin resource sharing
- **Security** - Helmet.js for security headers

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`
   - Fill in your configuration values:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/your-database
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     CLIENT_URL=http://localhost:3000
     ```

3. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Images

- `GET /api/images` - Get all images (with pagination)
- `GET /api/images/:id` - Get single image
- `POST /api/images` - Upload new image
- `PUT /api/images/:id` - Update image metadata
- `DELETE /api/images/:id` - Delete image

### Query Parameters

- `page` - Page number for pagination
- `limit` - Items per page
- `category` - Filter by category
- `search` - Text search in title, description, tags

## Image Upload

Send a `POST` request to `/api/images` with:
- `image` - Image file (multipart/form-data)
- `title` - Image title
- `description` - Image description
- `tags` - Comma-separated tags
- `category` - Image category
- `uploadedBy` - Uploader identifier

## File Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── cloudinary.js    # Cloudinary configuration
│   ├── controllers/
│   │   └── imageController.js
│   ├── middleware/
│   │   └── upload.js        # Multer + Cloudinary setup
│   ├── models/
│   │   └── Image.js         # Image schema
│   ├── routes/
│   │   └── images.js        # Image routes
│   ├── utils/
│   │   └── validation.js    # Input validation
│   └── index.js             # Main server file
├── .env.example
├── .gitignore
└── package.json
```

## Security Features

- Rate limiting (100 requests per 15 minutes)
- File type validation (images only)
- File size limits (5MB max)
- Input sanitization
- CORS protection
- Security headers via Helmet

## Development

The server uses nodemon for development with auto-restart on file changes.

```bash
npm run dev
```