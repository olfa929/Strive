**🏃‍♂️ StriveAI – AI Assistant for Marathon Athletes
❗ Problem Statement**

Athletes preparing for marathons undergo intensive training periods that place enormous strain on their cardiovascular and overall health. Medical teams often lack real-time, precise, and predictive tools to continuously monitor an athlete’s condition. Traditional wearables provide limited insights and fail to forecast potential health risks before they become critical.

💡 **Solution**

StriveAI revolutionizes marathon preparation by combining data from an integrated-circuit smart sports suit (not textile-based) with AI-powered digital twin simulations of the heart. This allows medical teams to track athletes’ medical state in real time, simulate heart performance under stress, and predict injury or health risks before they occur.

🌟 ***Key Features***

**Smart Suit Integration**: Collects continuous biometric signals (heart activity, sleep quality, overall state) from a next-gen circuit-embedded sports suit.

**Digital Heart Twin**: Creates a virtual model of the athlete’s heart, enabling simulation, anomaly detection, and predictive insights.

**AI-Driven Monitoring**: Uses machine learning to identify patterns, forecast risks, and deliver intelligent recommendations.

**Medical Team Dashboard**: Provides a centralized, clear, and data-rich view of each athlete’s condition during training.

**Personalized Athlete Profiles**: Stores athlete-specific details (height, weight, marathon date) for customized tracking.

**Modern UX**: Dark theme, smooth transitions, motivational design, and secure Supabase integration for reliable data management.

⚡ With StriveAI, marathon training becomes not only data-driven but also predictive, safe, and intelligent—empowering athletes to perform at their peak while minimizing health risks.

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

