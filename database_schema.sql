-- ==========================================
-- SURYA-SANCHAY DATABASE SCHEMA
-- Based on ERDiagram.drawio.png
-- ==========================================

-- 1. Users & Notifications
CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

CREATE TABLE Report (
    report_id SERIAL PRIMARY KEY,
    generated_by_userid INT REFERENCES "User"(user_id) ON DELETE SET NULL,
    report_type VARCHAR(100),
    period_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    file_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Grid & Outage
CREATE TABLE GridStatus (
    status_id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_online BOOLEAN DEFAULT TRUE,
    voltage_volts DECIMAL(5,2),
    frequency_hz DECIMAL(5,2)
);

CREATE TABLE GridOutage (
    outage_id SERIAL PRIMARY KEY,
    status_id INT REFERENCES GridStatus(status_id) ON DELETE SET NULL,
    outage_type VARCHAR(100),
    scheduled_start_time TIMESTAMP,
    scheduled_duration_minutes INT,
    actual_start_time TIMESTAMP,
    actual_end_time TIMESTAMP,
    reason TEXT,
    status VARCHAR(50)
);

CREATE TABLE Notification (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(user_id) ON DELETE CASCADE,
    outage_id INT REFERENCES GridOutage(outage_id) ON DELETE SET NULL,
    notification_type VARCHAR(100),
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Water Pumping
CREATE TABLE WaterPump (
    pump_id SERIAL PRIMARY KEY,
    pump_name VARCHAR(100),
    power_rating_watts DECIMAL(10,2),
    flow_rate_lpm DECIMAL(10,2),
    operating_voltage_min DECIMAL(5,2),
    operating_voltage_max DECIMAL(5,2),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE PumpingSchedule (
    schedule_id SERIAL PRIMARY KEY,
    pump_id INT REFERENCES WaterPump(pump_id) ON DELETE CASCADE,
    scheduled_start_time TIMESTAMP,
    scheduled_duration_minutes INT,
    target_water_litres DECIMAL(10,2),
    schedule_status VARCHAR(50)
);

CREATE TABLE WaterTank (
    tank_id SERIAL PRIMARY KEY,
    capacity_litres DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE PumpingSession (
    session_id SERIAL PRIMARY KEY,
    pump_id INT REFERENCES WaterPump(pump_id) ON DELETE SET NULL,
    schedule_id INT REFERENCES PumpingSchedule(schedule_id) ON DELETE SET NULL,
    tank_id INT REFERENCES WaterTank(tank_id) ON DELETE SET NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    water_pumped_litres DECIMAL(10,2),
    energy_consumed_kwh DECIMAL(10,2),
    average_voltage DECIMAL(5,2),
    average_solar_power_watts DECIMAL(10,2),
    session_type VARCHAR(50),
    status VARCHAR(50)
);

CREATE TABLE TankLevelHistory (
    level_id SERIAL PRIMARY KEY,
    tank_id INT REFERENCES WaterTank(tank_id) ON DELETE CASCADE,
    session_id INT REFERENCES PumpingSession(session_id) ON DELETE SET NULL,
    water_level_litres DECIMAL(10,2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Solar & Weather
CREATE TABLE WeatherData (
    weather_id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    temperature_celcius DECIMAL(5,2),
    weather_condition VARCHAR(100),
    solar_irradiance_wm2 DECIMAL(10,2)
);

CREATE TABLE SolarPanel (
    panel_id SERIAL PRIMARY KEY,
    total_capacity_kw DECIMAL(10,2),
    installation_date DATE,
    warranty_years INT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE SolarGeneration (
    generation_id SERIAL PRIMARY KEY,
    panel_id INT REFERENCES SolarPanel(panel_id) ON DELETE CASCADE,
    weather_id INT REFERENCES WeatherData(weather_id) ON DELETE SET NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    power_output_watts DECIMAL(10,2),
    energy_generated_kwh DECIMAL(10,2)
);

CREATE TABLE SolarForecast (
    forecast_id SERIAL PRIMARY KEY,
    panel_id INT REFERENCES SolarPanel(panel_id) ON DELETE CASCADE,
    weather_id INT REFERENCES WeatherData(weather_id) ON DELETE SET NULL,
    forecast_timestamp TIMESTAMP,
    predicted_power_watts DECIMAL(10,2),
    predicted_energy_kwh DECIMAL(10,2),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
