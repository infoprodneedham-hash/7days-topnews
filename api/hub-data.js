export default async function handler(req, res) {
  // Use your actual keys here
  const W_KEY = 'YOUR_OPENWEATHER_KEY';
  const N_KEY = 'YOUR_NEWSAPI_KEY';
  const CITY = 'Geelong,AU';

  try {
    // 1. Fetch Weather
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${W_KEY}`);
    const weatherData = await weatherRes.json();

    // 2. Fetch Forecast
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${W_KEY}`);
    const forecastData = await forecastRes.json();

    // 3. Fetch News (Australia)
    const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?country=au&apiKey=${N_KEY}`);
    const newsData = await newsRes.json();

    res.status(200).json({
      weather: weatherData,
      forecast: forecastData.list.filter(f => f.dt_txt.includes("12:00:00")),
      news: newsData.articles.slice(0, 8)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
