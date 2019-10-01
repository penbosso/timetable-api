import express from 'express';
import CourseInstancController from './courseInstance.controller';

const routesConfig = (app) => {
  app.get('/schedules',[CourseInstancController.schedule_get_all]);
  app.get('/schedules/similar/:_id',[CourseInstancController.schedule_get_similar]);
};
export default {routesConfig};
