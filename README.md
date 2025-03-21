# Divine College of Creative Arts Website

A modern, elegant, and user-friendly website for Divine College of Creative Arts, built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 Modern and responsive design
- 🌙 Dark mode support
- 🚀 Built with Next.js 14 and TypeScript
- 💅 Styled with Tailwind CSS and shadcn/ui
- 🔒 Authentication with NextAuth.js
- 💳 Payment integration with Stripe
- 📦 Data storage with Firebase/Supabase
- 📱 Mobile-friendly navigation
- 🎓 Course management system
- 🛍️ E-commerce functionality

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Authentication:** NextAuth.js
- **Database:** Firebase/Supabase
- **Payment:** Stripe
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/divine-college.git
cd divine-college
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
divine-college/
├── app/                # Next.js app directory
│   ├── (routes)/      # Route groups
│   ├── components/    # Reusable components
│   ├── lib/          # Utility functions and configurations
│   └── public/       # Static assets
├── components/        # Global components
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
