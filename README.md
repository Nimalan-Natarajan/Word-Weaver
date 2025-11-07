# WordWeaver ✨

A stunning, modern web application that transforms your thoughts into beautiful words using AI. Built with Next.js, TypeScript, and Tailwind CSS with Apple-inspired glassmorphic design.

## ✨ Features

- 🎭 **AI-Powered Content Generation** - Connects to Hugging Face model "NimalanNatarajan/poetry-generator"
- 🎨 **Glassmorphic Design** - Apple-inspired UI with blur effects and smooth animations
- 📱 **Mobile-First Responsive** - Perfect experience on all devices
- 🔧 **Advanced Controls** - Collapsible options for fine-tuning:
  - Max Length: Control output length (50-500 characters)
  - Creativity: Adjust temperature (0.1-2.0)
  - Diversity: Control top_p (0.1-1.0)
- 💡 **Quick Start Prompts** - Pre-made creative starters
- ⚡ **Instant Results** - Generated content appears prominently without scrolling
- 📋 **Copy & Regenerate** - Easy sharing and iteration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage

1. **Enter Your Inspiration**: Type your creative prompt or select from quick suggestions:
   - "The night falls" 🌙
   - "Stars above" ✨ (default)
   - "When the world" 🌍
   - "Love and" ❤️

2. **Fine-tune (Optional)**: Click "Advanced Options" to adjust:
   - **Max Length**: Control output length
   - **Creativity**: Higher values = more creative/unpredictable results
   - **Diversity**: Controls word choice variety

3. **Generate**: Click "Weave Words ✨" to create your content

4. **Enjoy & Share**: Your creation appears immediately with copy/regenerate options

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with glassmorphic effects
- **AI Integration**: Gradio Client for Hugging Face models
- **Design**: Apple-inspired UI with blur effects and animations

## 🤖 Model Integration

WordWeaver connects to the Hugging Face model `NimalanNatarajan/poetry-generator`:

```typescript
import { Client } from "@gradio/client";

const client = await Client.connect("NimalanNatarajan/poetry-generator");
const result = await client.predict("/generate_poem", {         
    prompt: "Stars above",         
    max_length: 200,         
    temperature: 0.9,         
    top_p: 0.95, 
});
```

## 🎨 Design Features

- **Glassmorphic UI**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Micro-interactions and transitions
- **Responsive Design**: Mobile-first approach
- **Apple-Style Typography**: Clean, modern fonts
- **Dynamic Gradients**: Animated background elements

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial WordWeaver commit"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically ✨

3. **Environment Variables**: None needed for this project!

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder or connect GitHub repo
   - Deploy automatically

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d out"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

## 📝 Pre-Deployment Checklist

- ✅ Test the app locally (`npm run dev`)
- ✅ Ensure Hugging Face model is accessible
- ✅ Test all features (generate, copy, regenerate)
- ✅ Test on mobile devices
- ✅ Check console for errors

## 🔧 Environment Setup

No environment variables required! The app connects directly to the public Hugging Face model.
