import express from 'express';
import CourseInstancController from './courseInstance.controller';

const routesConfig = (app) => {
  app.get('/schedules',[CourseInstancController.schedule_get_all]);
  app.get('/schedules/similar/:_id',[CourseInstancController.schedule_get_similar]);
  app.post('/schedule',[
                        ValidationMiddleware.validJWTNeeded,
                        PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
                        CourseInstancController.create_schedule]);
};
export default {routesConfig};
