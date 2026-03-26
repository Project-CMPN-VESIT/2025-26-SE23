Surya-Sanchay

Surya-Sanchay (सूर्य-संचय) is a comprehensive and interactive web-based dashboard for smart solar energy management, designed specifically for rural communities in India. Developed as a part of the Digital India initiative, it provides a user-friendly interface to monitor and manage solar power generation, water pumping systems, and grid integration.

The dashboard is built with a focus on accessibility and practicality, offering multi-language support (English, Hindi, and Marathi), a responsive design for various devices, and detailed, downloadable PDF reports.

✨ Key Features
Multi-language Support: Fully internationalized interface supporting English, Hindi (हि), and Marathi (म).
Dynamic Dashboard: Real-time metrics for solar generation, grid status, water pumped, and energy savings.
Solar Monitoring: Track live solar output, panel efficiency, battery charge levels, and daily generation trends.
Water Pump Management: Control and monitor solar-powered water pumps, view tank fill status, flow rate, and runtime.
Grid Resilience: Monitor grid connectivity, voltage, uptime, and log outage history with automatic switchover to solar power.
PDF Report Generation: Download detailed monthly and quarterly reports for energy, water, and grid performance in your chosen language.
"Golden Hour" Countdown: A timer that counts down to the next period of peak solar energy generation.
Responsive Design: A clean, modern UI that adapts seamlessly from desktop monitors to mobile devices.
Light & Dark Mode: Toggle between light and dark themes for comfortable viewing in any environment.
Interactive Components: Includes modals for actions, a notification panel for system alerts, and toast messages for user feedback.

🛠️ Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)
PDF Generation: jsPDF & jsPDF-AutoTable
Fonts: Google Fonts (Inter & Noto Sans Devanagari)

📂 File Structure
The repository is organized with a focus on simplicity and modularity:

└── SuryaSanchay/
    ├── SuryaSanchay.html   # The primary, all-in-one HTML file for the dashboard.
    ├── index.html          # An alternative entry point.
    ├── styles.css          # All CSS for styling, theming, and responsiveness.
    ├── script.js           # Core JavaScript for UI interactivity, modals, and event handling.
    ├── translations.js     # Contains the translation strings for English, Hindi, and Marathi.
    └── pdf-report.js       # Logic for generating dynamic PDF reports using jsPDF.

⚙️ Getting Started
Since this is a static web project, no complex setup or build process is required.

Clone the repository:
git clone https://github.com/priyal7119/SuryaSanchay.git

Navigate to the directory:
cd SuryaSanchay

Open the application: Simply open the SuryaSanchay.html file in any modern web browser (like Chrome, Firefox, or Edge) to run the application locally.
