import { IGetWeather } from "@/core/usecases/GetWeatherInterface";
import { Weather } from "@/core/entities/Weather";
import { env } from "@/config/env";
import axios from "axios";

export class VisualCrossingWeatherService implements IGetWeather {
  private static readonly WEATHER_API_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  async getWeatherByCity(city: string): Promise<Weather> {
    try {
      const url = `${VisualCrossingWeatherService.WEATHER_API_URL}/${encodeURIComponent(
        city,
      )}?key=${env.visualCrossingApiKey}&unitGroup=metric`;
      // console.log(`Fetching weather data from: ${url}`);

      const res = await axios.get(url);
      const data = res.data;

      return {
        city: data.address,
        temperature: data.currentConditions.temp,
        condition: data.currentConditions.conditions,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data. ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
