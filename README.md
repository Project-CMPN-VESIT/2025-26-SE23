Abstract 

Gadheshwar village faces a critical infrastructure challenge where frequent power outages and voltage fluctuations disrupt essential water supply and public safety. While community solar energy offers a sustainable alternative, the lack of a reliable mechanism to synchronize variable solar generation with the village's rigid consumption demands leads to inefficiency and resource wastage. This project introduces a digital intervention to bridge the gap between energy availability and utilization without the need for complex hardware investments.
Proposed Solution 
We propose Surya-Sanchay, a Smart Solar Management Information System (MIS) designed to act as a "Digital Coordinator" for the village's energy infrastructure. Unlike traditional solutions that rely on expensive physical sensors, this software-only platform optimizes the usage of existing solar panels and pumps. It dynamically matches high-demand tasks, such as water pumping, with peak solar generation windows, ensuring energy independence and operational efficiency.

Data Collection Approach 

The system eliminates the need for on-site hardware by leveraging external digital sources. It utilizes Satellite Weather APIs (such as NASA POWER or OpenWeatherMap) to fetch real-time solar irradiance and cloud cover data to predict energy generation potential. Simultaneously, a custom Web Scraping Module monitors official utility provider websites to log planned grid outages and maintenance schedules, creating a comprehensive virtual model of the village's energy environment.

App Features

Solar Production Forecasting: Predicts daily energy availability 24 hours in advance.
"Golden Hour" Scheduler: Identifies optimal time slots for running heavy water pumps.
Grid Reliability Tracker: Logs outage frequency directly from utility portals.
Advocacy Report Generator: Creates downloadable PDF reports on energy reliability for official complaints.
Smart Alerts: Notifies administrators when to switch to solar vs. grid power.

Target Users 

The primary users of this system are the Gram Panchayat Administrators and village utility operators. The interface is designed for non-technical users, functioning as a decision-support tool that simplifies complex energy data into actionable daily schedules for maintaining water supply and street lighting.

Expected Outcomes 

The implementation of Surya-Sanchay will result in a synchronized energy-water ecosystem, ensuring reliable water tank filling during peak sunlight hours.
