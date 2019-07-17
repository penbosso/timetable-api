import express from 'express';
import CourseInstancController from './courseInstance.controller';

const routesConfig = (app) => {
  app.get('/schedules',[CourseInstancController.schedule_get_all]);
};


export default {routesConfig};
