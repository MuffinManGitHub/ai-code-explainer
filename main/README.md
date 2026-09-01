## How It Works

1. Enter your code snippet in the input field
2. Click the "Explain" button
3. The AI analyzes your code and provides:
   - A clear explanation of the code's purpose and functionality
   - Overview of the structure and logic
   - Important concepts and techniques used
   - Suggestions for improvements (when applicable)
4. Results are displayed in a formatted markdown view


## Tech Stack

- **Frontend**: Next.js 16.3.2, React 19.2.8, TypeScript
- **Styling**: Tailwind CSS 4
- **AI Model**: Google Generative AI (Gemini 3.6 Flash)
- **Rate Limiting**: Upstash Redis & Rate Limit
- **Markdown Rendering**: React Markdown

## Features

- 🤖 **AI-Powered Code Explanations**: Get detailed explanations of code functionality and logic
- ⚡ **Real-time Analysis**: Instant explanations for any code snippet
- 📝 **Markdown Support**: Beautifully formatted responses with syntax highlighting
- 🛡️ **Rate Limiting**: IP-based rate limiting to prevent abuse
- 🎨 **Modern UI**: Clean and intuitive interface built with Tailwind CSS
- 💡 **Improvement Suggestions**: Get actionable tips on how to improve your code

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Google Generative AI API key from [Google AI Studio](https://aistudio.google.com)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-code-explainer/main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the `main` directory and add:
```
GEMINI_API_KEY=your_api_key_here
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-update as you make changes to `app/page.tsx`.

### Building for Production

```bash
npm run build
npm start
```

### Other Scripts

- `npm run lint` - Run ESLint to check code quality


