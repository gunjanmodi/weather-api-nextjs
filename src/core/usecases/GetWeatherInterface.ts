import { Weather } from "../entities/Weather";

export interface IGetWeather {
  getWeatherByCity(city: string): Promise<Weather>;
}
