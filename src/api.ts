import { AirPollutionSchema } from "./schemas/airPollutionSchema"
import { GeocodeSchema } from "./schemas/geocodeSchema"
import { weatherSchema } from "./schemas/weatherSchema"

const API_KEY = import.meta.env.VITE_API_KEY

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  return res.json() as Promise<T>
}

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const data = await fetchJson(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`
  )
  return weatherSchema.parse(data)
}

export async function getGeocode(location: string) {
  const data = await fetchJson(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
  )
  return GeocodeSchema.parse(data)
}

export async function getAirPollution({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) {
  const data = await fetchJson(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  return AirPollutionSchema.parse(data)
}
