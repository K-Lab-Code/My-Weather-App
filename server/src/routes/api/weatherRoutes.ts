import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name***
  WeatherService.getWeatherForCity(req.body.cityName).then((wet)=>{
    console.log(wet);//test if you can see what city requested
    res.json(wet);
  });
  
  // TODO: save city to search history***
  HistoryService.addCity(req.body.cityName);
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  res.json(HistoryService.getCities());
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, _res) => {
  HistoryService.removeCity(req.params.id);
});

export default router;
