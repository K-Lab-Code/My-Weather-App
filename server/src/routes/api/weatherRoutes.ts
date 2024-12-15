import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name***
  WeatherService.getWeatherForCity(req.body.cityName).then((weather)=>{
    console.log(weather);//test if you can see what city requested
    res.json(weather);
    return weather
  }).then((weather)=>{
    if (weather.length !== 0){
      HistoryService.addCity(req.body.cityName);
    }
  })
  
  // TODO: save city to search history***
  
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  HistoryService.getCities().then((cities)=>{res.json(cities)});
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  HistoryService.removeCity(req.params.id).then((id)=>{res.json(id)});
});

export default router;
