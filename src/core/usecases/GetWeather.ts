import { Weather } from "../entities/Weather";
import { IGetWeather } from "./GetWeatherInterface";
import { getFromCache, setToCache } from "@/infrastructure/cache/RedisClient";

export class GetWeather {
  private weatherService: IGetWeather;

  constructor(weatherService: IGetWeather) {
    this.weatherService = weatherService;
  }

  async execute(city: string): Promise<Weather> {
    const cacheKey = `weather:${city.toLowerCase()}`;
    const cached = await getFromCache<Weather>(cacheKey);
    if (cached) return cached;

    const weather = await this.weatherService.getWeatherByCity(city);
    await setToCache(cacheKey, weather);
    return weather;
  }
}
