# MaViGpt - AI Assistant

A fully functional ChatGPT-like AI assistant built with React, TypeScript, Firebase, and Google Gemini AI.

![MaViGpt](https://img.shields.io/badge/MaViGpt-AI%20Assistant-blueviolet)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)

## ✨ Features

- 🔐 **Authentication**: Email/Password and Google OAuth
- 🤖 **AI Chat**: Real-time streaming responses from Google Gemini
- 💾 **Persistence**: Conversation history saved in Firestore
- 🎨 **Beautiful UI**: ChatGPT-inspired dark theme
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 💬 **Markdown**: Full markdown and code syntax highlighting
- 🔒 **Secure**: Firestore security rules protect user data

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Firebase account
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mavigpt.git
   cd mavigpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Copy your Firebase config to `.env.local`

### Firestore Security Rules

Apply these rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Google Gemini API

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to `.env.local` as `VITE_GEMINI_API_KEY`

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🌐 Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Don't forget to add your Vercel domain to Firebase authorized domains.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS (ChatGPT-inspired design)
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **AI**: Google Gemini API
- **Routing**: React Router v6
- **Markdown**: react-markdown
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: lucide-react

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── config/          # Firebase configuration
├── contexts/        # React contexts (Auth)
├── pages/           # Page components
├── services/        # API services (Gemini, Firestore)
└── types/           # TypeScript type definitions
```

## 🔐 Security

- Environment variables are never committed to git
- Firestore rules ensure users can only access their own data
- API keys are stored securely in environment variables
- Protected routes prevent unauthorized access

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Acknowledgments

- UI inspired by ChatGPT
- Powered by Google Gemini AI
- Built with Firebase

---

**Made with ❤️ by Mayur**
