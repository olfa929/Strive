# 🏃‍♂️ StriveAI – AI Assistant for Marathon Athletes

## ❗ Problem Statement
Athletes preparing for marathons undergo intensive training periods that place enormous strain on their cardiovascular and overall health. Medical teams often lack real-time, precise, and predictive tools to continuously monitor an athlete’s condition. Traditional wearables provide limited insights and fail to forecast potential health risks before they become critical.

## 💡 Solution
StriveAI revolutionizes marathon preparation by combining data from an integrated-circuit smart sports suit (not textile-based) with AI-powered digital twin simulations of the heart. This allows medical teams to track athletes’ medical state in real time, simulate heart performance under stress, and predict injury or health risks before they occur.

## 🌟 Key Features

- **Smart Suit Integration**: Collects continuous biometric signals (heart activity, sleep quality, overall state) from a next-gen circuit-embedded sports suit.
- **Digital Heart Twin**: Creates a virtual model of the athlete’s heart, enabling simulation, anomaly detection, and predictive insights.
- **AI-Driven Monitoring**: Uses machine learning to identify patterns, forecast risks, and deliver intelligent recommendations.
- **Medical Team Dashboard**: Provides a centralized, clear, and data-rich view of each athlete’s condition during training.
- **Personalized Athlete Profiles**: Stores athlete-specific details (height, weight, marathon date) for customized tracking.
- **Modern UX**: Dark theme, smooth transitions, motivational design, and secure Supabase integration for reliable data management.

⚡ With StriveAI, marathon training becomes not only data-driven but also predictive, safe, and intelligent—empowering athletes to perform at their peak while minimizing health risks.

## 🛒 Web Interface
- **User Authentication** - Secure sign-in and sign-up functionality
- **Dashboard** - Personalized overview of health metrics and progress
- **Heart Monitoring** - Advanced heart rate tracking and analysis
- **Responsive Design** - Fully responsive UI that works across all devices
- **Modern UI Components** - Built with shadcn/ui for a consistent and beautiful interface

## 🤖 Tech Stack
- **Framework**: App Router in Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Custom authentication system
- **State Management**: React Hooks


## 🧠 AI Architecture – StriveAI Agent + Models

### Data Sources
Integrated-circuit smart sports suit (heart rate, HRV, respiration, motion, skin temp, exertion).
Smartwatch for sleep and environment data (sleep stages, interruptions, noise/light).

### Preprocessing & Features
Real-time signal cleaning and noise reduction.
Rolling windows of biometric data for near-instant analysis.
Derived metrics: HRV indicators, recovery slope, exertion proxies, sleep quality indices.

### Modeling Stack (6+ Models)
- Real-Time Risk Classifier – lightweight CNN/GRU for instant “OK / Caution / Stop” signals.
- Short-Horizon Forecaster – predicts near-future heart and recovery trends using temporal models.
- Anomaly Detector – catches unseen or abnormal heart dynamics with autoencoders.
- Sleep Quality Model – scores nightly recovery readiness from sleep metrics.
- Digital Heart Twin Simulation – virtual heart model that stress-tests performance under forecasted load.
- Eligibility Decision Layer – combines all models’ outputs into a single “play / rest” recommendation.

### Agent Orchestration
Manages data ingestion, model calls, and decision logic.
Balances risk, anomaly detection, and digital twin results into an Eligibility Score.
Escalates alerts to medical teams with clear recommendations.

### Evaluation & Benchmarks
- Accuracy: AUROC, precision/recall of alerts.
- Forecast quality: MAE and uncertainty coverage.*
- System performance: low latency (<250 ms for decisions).
- Explainability & Auditability
- Highlights top contributing features for each decision.
- Tracks model versions, thresholds, and athlete outcomes for accountability.

⚡ This architecture enables StriveAI to act as an intelligent, real-time health guardian for athletes — combining multiple AI models with a digital twin of the heart to ensure safe and optimized performance.

## ⏬ Getting Started

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


## Model Training
The prediction model used in StriveAI was trained using [Google Colab](https://colab.research.google.com/). You can find the training code and methodology in our [training notebook](https://colab.research.google.com/drive/1Ejv6TZXQWFKXviYrWUpvPiILPFk6jPS0?usp=sharing&fbclid=IwY2xjawMyck5leHRuA2FlbQIxMABicmlkETFydVZBcW1ndVlkWDlqWEkxAR6Gig4ylFWtqvXZaUMz1EGWUvcihoGqq-asrUf4eAln-DdZ8-1Aet52d11SKA_aem_ZhuDXyO4EyuhLvQaAiWu0A#scrollTo=Vp464D6qOejX).

The notebook contains:
- Data preprocessing steps
- Training process
- Evaluation metrics


## Externel Ressources: 
  - QROQ API for advanced data processing
    
  - *3D Visualization*: [Digital Twin Heart Model] (https://drive.google.com/file/d/1LVmLTn2dACesKEly0xRo_WKNNkHVOHD4/view?fbclid=IwY2xjawMzgu9leHRuA2FlbQIxMABicmlkETFQQmRuQWg1TmRnZDJHY1ZBAR4uNOn27-M1c3QA645ZU9KxjBeO7dL9TVd_HioBd4ZZhqgBiCMb5kVPIkZLDg_aem_rYwDgSYZyj2dJrbsDl61Sg)
    
- *external data*: [kaggle] (https://www.kaggle.com/datasets/ziya07/wearable-sensor-system-for-physical-education?utm_source=chatgpt.com&fbclid=IwY2xjawMzfwdleHRuA2FlbQIxMABicmlkETFQQmRuQWg1TmRnZDJHY1ZBAR4KbaaLGRF6DdCAjXsqG2SohsxuMNKjFDAbx43xASrqwoFhzLhK8o5sCG9eTQ_aem_w31cmFYFLZgT_xc2xcwQ_Q)

## 📂 Project Structure

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

## License
This project is licensed under the MIT License - see the LICENSE file for details.

