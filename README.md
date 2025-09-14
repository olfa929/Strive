# StriveAI - Intelligent Health & Fitness Monitoring

StriveAI is an advanced AI assistant designed specifically for athletes training for marathons. Our platform helps medical teams track and monitor crucial health metrics during the intensive month-long training period before major marathons.

## Features

- **User Authentication** - Secure sign-in and sign-up functionality
- **Dashboard** - Personalized overview of health metrics and progress
- **Heart Monitoring** - Advanced heart rate tracking and analysis
- **Responsive Design** - Fully responsive UI that works across all devices
- **Modern UI Components** - Built with shadcn/ui for a consistent and beautiful interface

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Custom authentication system
- **State Management**: React Hooks

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/olfa929/StriveAI.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
StriveAI/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── heart-monitoring/  # Heart monitoring feature
│   ├── signin/           # Authentication pages
│   └── signup/
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Development

- Built using the App Router in Next.js
- Follows TypeScript best practices
- Uses modern React patterns and hooks
- Implements responsive design principles

## Model Training

The prediction model used in StriveAI was trained using [Google Colab](https://colab.research.google.com/). You can find the training code and methodology in our [training notebook](https://colab.research.google.com/drive/1Ejv6TZXQWFKXviYrWUpvPiILPFk6jPS0?usp=sharing&fbclid=IwY2xjawMyck5leHRuA2FlbQIxMABicmlkETFydVZBcW1ndVlkWDlqWEkxAR6Gig4ylFWtqvXZaUMz1EGWUvcihoGqq-asrUf4eAln-DdZ8-1Aet52d11SKA_aem_ZhuDXyO4EyuhLvQaAiWu0A#scrollTo=Vp464D6qOejX).

The notebook contains:
- Data preprocessing steps
- Training process
- Evaluation metrics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

