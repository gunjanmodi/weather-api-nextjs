# Weather API

A simple weather API built with Next.js, TypeScript, and Visual Crossing Weather Service.  
Implements rate limiting, error handling, and supports caching.

## Features

- Get current weather for a city
- Rate limiting per IP
- TypeScript strict typing
- Prettier formatting and ESLint linting

## Getting Started

### Prerequisites

## Prerequisites

Before you begin, ensure you have the following installed:

- 📦 [Node.js](https://nodejs.org/) (v20 or greater)
- 🐳 [Docker](https://www.docker.com/) - Required for local development
- ☁️ [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api/) - Weather Service


### Installation

```bash
git clone https://github.com/gunjanmodi/weather-api-nextjs.git
cd weather-api
npm install
```

### Start redis container

```bash
sh ./start-redis.sh
```

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

## API Usage

### Get Weather

**Endpoint:**  
`GET /api/weather?city=<city_name>`

**Query Parameters:**

- `city` (required): Name of the city to fetch weather for.

**Example:**

```bash
curl "http://localhost:3000/api/weather?city=Ahmedabad"
```

**Response:**

```json
{
    "city": "Ahmedabad",
    "temperature": 33,
    "condition": "Clear",
    "timestamp": "2025-06-06T06:42:46.701Z"
}
```

## Code Quality

- **Lint:**  
  ```bash
  npm run lint
  ```

- **Lint Fix:**  
  ```bash
  npm run lint:fix
  ```

- **Format Check:**  
  ```bash
  npm run format:check
  ```

- **Format Write:**  
  ```bash
  npm run format:write
  ```

- **Type Check:**  
  ```bash
  npm run typecheck
  ```

## License

MIT