# VidBase

VidBase is a modern video upload and sharing platform built with [Next.js](https://nextjs.org), [MongoDB](https://www.mongodb.com/), and [ImageKit](https://imagekit.io/). Users can register, log in, upload videos with thumbnails, and view a gallery of uploaded content.

## Features

- User authentication (email/password, Google, GitHub)
- Video upload with thumbnail support (ImageKit integration)
- Responsive video gallery
- Secure API routes with NextAuth
- Modern UI with Tailwind CSS
- MongoDB for persistent storage

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up environment variables

Create a `.env` file in the root directory and add the following (replace with your own credentials):

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint
NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` – Next.js app directory (pages, components, API routes)
- `models/` – Mongoose models for MongoDB
- `lib/` – Utility libraries (auth, db, API client)
- `public/` – Static assets
- `types/` – TypeScript type definitions

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [ImageKit Docs](https://docs.imagekit.io/)
- [NextAuth.js Docs](https://next-auth.js.org/)

## Deploy

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.