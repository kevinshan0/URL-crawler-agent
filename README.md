# Documentation Crawler Assistant

A modern web application that helps users extract, crawl, and condense documentation from any website. Built with SvelteKit and Python, featuring AI-powered content processing and secure authentication.

## Features

### 🔐 User Authentication
- Secure Firebase Authentication integration
- Email/password and Google sign-in options
- Protected routes and API endpoints
- User session management
- Secure user data storage in Firebase

### 💻 Responsive Web Interface
- Modern, clean UI built with SvelteKit
- Fully responsive design for all device sizes
- Accessible following WCAG guidelines
- Real-time chat interface
- Dark/light theme support
- Loading states and error handling

### 🤖 AI Documentation Assistant
- Intelligent documentation crawling and processing
- Sitemap-based URL discovery
- Markdown conversion of web content
- AI-powered content summarization
- Structured response format
- Error handling and graceful fallbacks

## Technology Stack

### Frontend
- **SvelteKit 5** - Modern web framework with server-side rendering
- **TypeScript** - Type-safe development
- **Firebase SDK** - Authentication and database integration
- **TailwindCSS** - Utility-first CSS framework

### Backend
- **Python FastAPI** - High-performance async API framework
- **Pydantic** - Data validation using Python type annotations
- **Pydantic AI** - AI agent framework for structured interactions
- **Crawl4AI** - Advanced web crawling and content processing
- **OpenAI GPT-4** - AI model for content understanding and summarization

### Database & Authentication
- **Firebase Authentication** - User management and security
- **Firebase Realtime Database** - Data storage and real-time updates

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Firebase project credentials
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd api
pip install -r requirements.txt
```

4. Set up environment variables:

Create `.env` file in the api directory:
```env
OPENAI_API_KEY=your_openai_api_key
```

Create `.env` file in the root directory:
```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Running the Application

1. Start the backend server:
```bash
cd api
uvicorn api_endpoint:app --reload
```

2. Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Documentation

### Crawler Endpoint
```typescript
POST /
Content-Type: application/json

{
    "chat_message": "https://example.com"
}
```

Response:
```json
{
    "success": boolean,
    "message": string,
    "content": {
        "url": "markdown_content"
    }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-4 API
- Crawl4AI team for the web crawling library
- Firebase team for authentication and database solutions
- SvelteKit team for the amazing web framework
