import { GetWeather } from "@/core/usecases/GetWeather";
import { VisualCrossingWeatherService } from "@/infrastructure/services/VisualCrossingWeatherService";
import { applyRateLimit } from "@/utils/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  try {
    await applyRateLimit(ip);
    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required" },
        { status: 400 },
      );
    }

    const service = new VisualCrossingWeatherService();
    const usecase = new GetWeather(service);
    const weather = await usecase.execute(city);
    return NextResponse.json(weather);
  } catch (error: unknown) {
    let status = 500;
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
      if ("statusCode" in error && typeof (error as any).statusCode === "number") {
        status = (error as any).statusCode;
      }
    }
    return NextResponse.json(
      { error: message},
      { status },
    );
  }
}
