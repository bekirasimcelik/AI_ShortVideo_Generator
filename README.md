# AI Short Video Generator 🎥

![AI Video Generator Banner](https://your-banner-image-url.png)

AI Short Video Generator is a modern web application that automatically creates short video content using artificial intelligence technologies. Users can create, edit and share their own custom videos with a few clicks.

## 🌟 Features

- 🤖 AI-powered scenario creation
- 🎨 Customizable video styles
- 🔊 Automatic voice synthesis
- 📝 Automatic subtitle generation
- 🖼️ Image generation with AI
- 💳 Credit-based utilization system
- 👥 User management and authentication

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: NeonDB (PostgreSQL)
- **Authentication**: Clerk
- **AI Services**: Google Gemini, Replicate
- **Storage**: Firebase Storage
- **Video Processing**: Remotion
- **UI Components**: Radix UI
- **Other**: AssemblyAI (Subtitling), Google Text-to-Speech

## 🚀 Setup

1. Clone the repository:

```bash
https://github.com/bekirasimcelik/AI_ShortVideo_Generator.git

cd ai-video-generator
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a .env file with the necessary variables.

- **NEXT_PUBLIC_DRIZZLE_DATABASE_URL**=your_neon_db_url
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**=your_clerk_pub_key
- **CLERK_SECRET_KEY**=your_clerk_secret_key
- **NEXT_PUBLIC_GEMINI_API_KEY**=your_gemini_api_key
- **GOOGLE_API_KEY**=your_google_api_key
- **NEXT_PUBLICK_FIREBASE_API_KEY**=your_firebase_api_key
- **CAPTION_API**=your_assemblyai_api_key
- **REPLICATE_API_TOKEN**=your_replicate_token

4. Run the development server:

```bash
npm run db:push
```

5. Run the database studio:

```bash
npm run db:studio
```

6. Run the development server:

```bash
npm run dev
```

## 🔑 Required API Keys

| Service       | Free Limit         | Registration URL                           |
| ------------- | ------------------ | ------------------------------------------ |
| Clerk         | ✅ Starter package | [Clerk](https://clerk.dev)                 |
| Google Gemini | ✅ Monthly quota   | [Google AI](https://makersuite.google.com) |
| Firebase      | ✅ Spark plan      | [Firebase](https://firebase.google.com)    |
| AssemblyAI    | 🔄 Limited trial   | [AssemblyAI](https://assemblyai.com)       |
| Replicate     | 💰 Per use         | [Replicate](https://replicate.com)         |
| NeonDB        | ✅ Free tier       | [NeonDB](https://neon.tech)                |

## 🎯 Usage

1. Create an account or log in
2. Click on the “Create New” button from the Dashboard
3. Choose video subject and style
4. Wait for AI to generate the video content
5. Preview and download the generated video

## 💡 Features and Limits

- 30 credits for each new user
- 10 credits for each video creation
- Maximum video duration: 60 seconds
- Supported styles: Generate your own story, Random AI Story, Scary Story, Historical Facts, Bed Time Story, Motivational, Fun Facts.

## 🤝 Contribution

1. Fork
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: Add amazing feature'`)
4. Push to Branch (`git push origin feature/amazing-feature`)
5. Open Pull Request
