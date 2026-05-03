# MatDaan Guide (मतदान गाइड) 🗳️🇮🇳

**MatDaan Guide** is a premium, AI-powered bilingual platform designed to empower Indian citizens with accurate, non-partisan election information. Built for the **Prompt Wars Hackathon**, it leverages **Google Gemini 2.5 Flash** to bridge the gap between complex constitutional procedures and every citizen.

---

## 🏛️ Project Overview

- **Vertical**: Civic Technology & Public Engagement (Voter Education)
- **Persona**: The "Digital-First Voter" — specifically targeting India's massive youth demographic who require quick, reliable, and accessible information on the go.

## 🚀 Key Features

### 1. Bilingual AI Assistant (Powered by Gemini 2.5 Flash)
- **Context-Aware Q&A**: Dynamically detects the user's language (English/Hindi) and responds accordingly.
- **Smart Actions**: Based on the AI's response, the assistant provides immediate next steps like "Find Polling Station," "Apply for Voter ID," or "Download e-EPIC."
- **Safety First**: Strictly follows a non-partisan knowledge base, ensuring no political bias or endorsement.

### 2. Interactive Data Dashboard
- **Visual Insights**: Uses **Recharts** to visualize complex election data such as voter turnout trends (1951-2024), gender participation gap, and demographic breakdowns.
- **Bilingual Visuals**: All charts and tooltips transition seamlessly between English and Hindi.

### 3. Step-by-Step Voter Journey
- **EVM Simulator**: A high-fidelity interactive simulator that mimics the voting process, complete with audio feedback (beep) and 7-second VVPAT verification logic.
- **Guide System**: A 6-step breakdown of the voter experience, from registration to the polling booth.

### 4. Gamified Readiness
- **Civic Quiz**: A 5-question readiness test to evaluate the user's election knowledge.
- **Democracy Champion Badge**: Successful participants generate and download a personalized, bilingual badge using `html-to-image`.

---

## 🛠️ Technology Stack & Logic

- **AI Core**: `Google Gemini 1.5 Flash` via `@google/generative-ai`.
- **Authentication**: `Google Identity Services` (GSI) for seamless secure sign-in.
- **Analytics**: `Google Analytics (gtag)` for tracking user engagement and quiz completions.
- **Frontend**: `React 19`, `Vite`, `TypeScript`, `Tailwind CSS`.
- **Efficiency**: `React.lazy` and `Suspense` for route-based code splitting, minimizing initial bundle size.
- **Animations**: `GSAP` and `Framer Motion`.
- **Data Viz**: `Recharts`.
- **Localization**: Custom `LanguageContext` for full EN/HI support.

---

## 🧠 Approach & Design Philosophy

1. **Accessibility First**: Typography (Outfit/Inter) and color palettes were chosen to ensure readability across all age groups. The bilingual support ensures the rural and urban divide is bridged.
2. **Immersive UX**: Instead of a static FAQ, we built a **dynamic timeline** and **simulator**. Learning by doing is more effective than reading.
3. **Efficiency**: The app is built to be lightweight (< 10MB repository size) while delivering a feature-rich experience.
4. **Google Services Integration**:
    * **Gemini 2.5 Flash**: Orchestrates the entire knowledge-retrieval system.
    * **Google Fonts**: Provides a modern, premium look.
    * **Chrome DevTools**: Extensively used for performance profiling and accessibility audits.

---

## 📝 Assumptions & Constraints

- **Data Accuracy**: Election statistics are based on the latest available data (2024 General Election) provided by ECI sources.
- **API Access**: The Gemini integration assumes an active `VITE_GEMINI_API_KEY` is provided in the environment.
- **Device Support**: Optimized for both Desktop and Mobile (Responsive design).

---

## 🏁 How to Run

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up `.env` with `VITE_GEMINI_API_KEY`.
4. Run the development server: `npm run dev`.
5. For the AI-assisted backend: `npm run server`.

---

## ✅ Testing & Validation

- **Unit Testing**: Core logic (like contextual action derivation) is validated using **Vitest**. Run tests via `npm test`.
- **Manual Verification**:
  - **EVM Simulator**: Tested across multiple scenarios (single vote, VVPAT delay, beep audio).
  - **Bilingual Switch**: Verified 100% token coverage for both English and Hindi across all 6 routes.
  - **Badge Generation**: Validated PNG export quality and text alignment on mobile vs desktop.

---

**Built with ❤️ for a stronger democracy.**
