import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city?: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }

}



// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties***???
  private baseURL?: string;

  private apiKey?: string;


  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(city: string): Promise<Coordinates> {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`)//fetching geo location
    const obj = await response.json();
    const coordinates: Coordinates = { lat: obj[0]['lat'], lon: obj[0]['lon'] };
    return coordinates;
  }
  //TODO: Create destructureLocationData method
  //private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  //private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  //private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  //private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`);//fetching weather info
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(city: string, weatherRawData: any): Weather {
    return new Weather(city, weatherRawData.list[0].dt_txt, weatherRawData.list[0].weather[0].icon, weatherRawData.list[0].weather[0].description, Math.floor(((Number(weatherRawData.list[0].main.temp) - 273.15) * 1.8) + 32), weatherRawData.list[0].wind.speed, Number(weatherRawData.list[0].main.humidity));
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherRawData: any): Weather[] {
    const forecastArray: Weather[] = [currentWeather];// start the array
    const num: number[] = [7, 15, 23, 31, 39];//index numbers to find diffrent days of the week
    //creates all weather objects that get added to forecast array
    forecastArray.push(...num.map((i) => {
      console.log(i);
      return new Weather('', weatherRawData.list[i].dt_txt, weatherRawData.list[i].weather[0].icon, weatherRawData.list[i].weather[0].description, Math.floor(((Number(weatherRawData.list[i].main.temp) - 273.15) * 1.8) + 32), weatherRawData.list[i].wind.speed, Number(weatherRawData.list[i].main.humidity));
    }));
    return forecastArray;


  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      const coordinates: Coordinates = await this.fetchLocationData(city);
      const weatherRawData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(city, weatherRawData);
      return this.buildForecastArray(currentWeather, weatherRawData);
    }
    catch(err){
      return [];
    }
  }
}

export default new WeatherService();

/*
async getWeatherForCity(city: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`)//fetching geo location
    const obj = await response.json();
    const coordinates: Coordinates = {lat: obj[0]['lat'], lon: obj[0]['lon']};
    const response2 = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`);//fetching weather info
    const obj2 = await response2.json();
    return new Weather(city, obj2.list[0].dt_txt, obj2.list[0].weather[0].icon, obj2.list[0].weather[0].description, (((Number(obj2.list[0].main.temp) - 273.15) * 1.8) + 32), obj2.list[0].wind.speed, Number(obj2.list[0].main.humidity));
  }
*/
//{ date, icon, iconDescription, tempF, windSpeed, humidity }