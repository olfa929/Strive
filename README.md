**🏃‍♂️ StriveAI – AI Assistant for Marathon Athletes**

StriveAI is an intelligent platform that supports athletes and their medical teams in the crucial weeks leading up to a marathon. It leverages real-time biometric data from an integrated-circuit smart sports suit (not textile-based) and combines it with AI-driven digital twin simulations of the heart. This allows teams to monitor, predict, and optimize an athlete’s condition throughout intensive training.

**🌟 Key Features**

Smart Suit Integration: Collects continuous physiological signals (heart activity, sleep quality, overall medical state) from an advanced circuit-embedded sports suit.

Digital Twin of the Heart: Generates a virtual model of the athlete’s heart to simulate performance, detect anomalies, and predict injury risks.

AI-Powered Insights: Applies machine learning to detect patterns, forecast risks, and deliver actionable medical recommendations.

Medical Team Dashboard: Centralized, intuitive view for doctors and trainers to track athlete health during the pre-marathon period.

Personalized Athlete Profiles: Records height, weight, and marathon date for tailored monitoring and predictions.

Seamless Experience: Dark modern UI with smooth transitions, motivational visuals, and secure Supabase data storage.

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

## Externel Ressources: 
  - QROQ API for advanced data processing
    
  - *3D Visualization*: [Digital Twin Heart Model] (https://drive.google.com/file/d/1LVmLTn2dACesKEly0xRo_WKNNkHVOHD4/view?fbclid=IwY2xjawMzgu9leHRuA2FlbQIxMABicmlkETFQQmRuQWg1TmRnZDJHY1ZBAR4uNOn27-M1c3QA645ZU9KxjBeO7dL9TVd_HioBd4ZZhqgBiCMb5kVPIkZLDg_aem_rYwDgSYZyj2dJrbsDl61Sg)
    
- *external data*: [kaggle] (https://www.kaggle.com/datasets/ziya07/wearable-sensor-system-for-physical-education?utm_source=chatgpt.com&fbclid=IwY2xjawMzfwdleHRuA2FlbQIxMABicmlkETFQQmRuQWg1TmRnZDJHY1ZBAR4KbaaLGRF6DdCAjXsqG2SohsxuMNKjFDAbx43xASrqwoFhzLhK8o5sCG9eTQ_aem_w31cmFYFLZgT_xc2xcwQ_Q)


## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/olfa929/Strive.git
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
Strive/
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

