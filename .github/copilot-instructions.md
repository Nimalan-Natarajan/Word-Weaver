# Copilot Instructions for AI Poetry Generator

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js TypeScript project for an AI Poetry Generator frontend that connects to a Hugging Face Gradio model.

## Project Context
- **Purpose**: Frontend interface for AI-generated poetry
- **Model**: Connects to "NimalanNatarajan/poetry-generator" on Hugging Face
- **Technology Stack**: Next.js 15, TypeScript, Tailwind CSS, Gradio Client
- **UI Style**: Dark theme, mobile-responsive, modern design with sliders for creativity controls

## Key Features
- Text input for poetry prompts
- Adjustable parameters: max length, temperature (creativity), top_p (diversity)
- Real-time poetry generation via Gradio client
- Mobile-first responsive design
- Dark theme with gradient backgrounds

## API Integration
Uses @gradio/client to connect to the Hugging Face model:
```typescript
import { Client } from "@gradio/client";

const client = await Client.connect("NimalanNatarajan/poetry-generator");
const result = await client.predict("/generate_poem", {         
    prompt: "Hello!!",         
    max_length: 50,         
    temperature: 0.1,         
    top_p: 0.1, 
});
```

## Design Guidelines
- Use Tailwind CSS for styling
- Implement mobile-first responsive design
- Maintain dark theme with purple/blue accents
- Include interactive sliders for parameter control
- Ensure accessibility and smooth user experience
