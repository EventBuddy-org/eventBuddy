# EventBuddy

## Overview
EventBuddy is a modern event management platform that allows users to explore and host events effortlessly. What makes EventBuddy stand out is its one-click event poster generation using Generative AI, making event promotion seamless and visually appealing.


Additionally, EventBuddy integrates with Telegram and Discord, ensuring real-time updates are delivered to social channels whenever an organizer makes any changes to an event.

## Features
- 🎟 Explore and Host Events – Discover exciting events or create your own with ease.
- 🖼 One-Click AI-Generated Posters – Automatically generate eye-catching event posters using Cloudflare's Generative AI model.
- 🤖 Telegram & Discord Integration – Get event updates directly in your community channels whenever event details change.
- 🎨 Modern UI – A sleek, intuitive interface built with Next.js, Tailwind CSS, and ShadCN UI for an exceptional user experience.
- ⚡️ Real-Time Updates – Instant event updates pushed to Telegram and Discord via bots.

## Tech Stack
- Frontend: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- AI Image Generation: [Cloudflare’s Generative AI Model](https://developers.cloudflare.com)
- Social Integrations:
  - [Telegram Bot API](https://core.telegram.org/bots/api) (via Python SDK for Telegram)
  - [Discord Webhooks](https://discord.com/developers/docs/resources/webhook)
- Backend & Deployment: Next.js API Routes, Cloudflare for AI models

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (LTS recommended)
- Python (for Telegram Bot API integration)
- A Telegram bot token & Discord webhook

### Installation
# Clone the repository
git clone https://github.com/EventBuddy-org/eventbuddy.git
cd eventbuddy

# Install dependencies
`pnpm install`

### Running the App
npm run dev
The app will be available at http://localhost:3000

## Team
- Aquib Alam
- Syed Mohammad Ail Jafri
- Sk Sameer Salam
- Tushar Daiya
