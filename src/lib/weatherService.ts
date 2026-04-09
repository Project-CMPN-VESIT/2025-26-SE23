// ☀️ weatherService.ts — Open-Meteo API (free, no API key needed)

export interface HourlyWeatherData {
  hour: number;
  label: string;
  generation: number;   // 0–100 normalized
  radiation: number;    // Raw W/m²
  cloudcover: number;   // %
}

export interface WeatherInfo {
  city: string;
  temperature: number;
  cloudcover: number;
  lat: number;
  lon: number;
}

/** Ask browser for GPS coordinates */
export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 12000, enableHighAccuracy: false }
    );
  });
}

/** Reverse-geocode coordinates to city name via Nominatim (OpenStreetMap, free) */
export async function getCityName(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      'Your Location'
    );
  } catch {
    return 'Your Location';
  }
}

/** Fetch today's hourly solar radiation + cloud cover from Open-Meteo */
export async function fetchSolarWeatherData(
  lat: number,
  lon: number
): Promise<{ hourlyData: HourlyWeatherData[]; weatherInfo: Partial<WeatherInfo> }> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&hourly=direct_radiation,cloudcover,temperature_2m` +
    `&timezone=auto&forecast_days=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  const data = await res.json();

  // Validate API response shape before destructuring
  if (
    !data?.hourly?.direct_radiation ||
    !data?.hourly?.cloudcover ||
    !data?.hourly?.temperature_2m
  ) {
    throw new Error('Unexpected API response shape from Open-Meteo');
  }

  // Open-Meteo returns 24 values for today when forecast_days=1
  const radiations: number[] = data.hourly.direct_radiation.slice(0, 24);
  const cloudcovers: number[] = data.hourly.cloudcover.slice(0, 24);
  const temperatures: number[] = data.hourly.temperature_2m.slice(0, 24);

  const maxRad = Math.max(...radiations, 1);

  const hourlyData: HourlyWeatherData[] = radiations.map((rad, i) => ({
    hour: i,
    label: `${i}:00`,
    generation: Math.round((rad / maxRad) * 100),
    radiation: Math.round(rad),
    cloudcover: cloudcovers[i],
  }));

  const currentHour = new Date().getHours();
  const weatherInfo: Partial<WeatherInfo> = {
    temperature: Math.round(temperatures[currentHour]),
    cloudcover: Math.round(cloudcovers[currentHour]),
    lat,
    lon,
  };

  return { hourlyData, weatherInfo };
}

/**
 * Generate realistic synthetic solar generation data for a typical sunny day.
 * Used as fallback when geolocation is denied or weather API is unavailable.
 * Uses deterministic cloud-cover values (no Math.random) to prevent chart jumping on refresh.
 */
export function generateFallbackHourlyData(): HourlyWeatherData[] {
  // Typical solar bell-curve peaking around 12–13h
  const profile = [
    0, 0, 0, 0, 0, 2, 8, 20, 38, 55, 70, 85,
    92, 88, 78, 62, 44, 28, 14, 5, 1, 0, 0, 0,
  ];
  // Deterministic cloud-cover pattern — avoids chart flickering on refresh
  const cloudPattern = [
    0, 0, 0, 0, 0, 5, 8, 10, 12, 14, 12, 10,
    8, 9, 11, 13, 15, 12, 8, 5, 2, 0, 0, 0,
  ];
  return profile.map((gen, i) => ({
    hour: i,
    label: `${i}:00`,
    generation: gen,
    radiation: Math.round((gen / 100) * 900),
    cloudcover: gen > 0 ? cloudPattern[i] : 0,
  }));
}

