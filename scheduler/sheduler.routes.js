import CourseInstancController from './courseInstance.controller';
import PermissionMiddleware from '../common/auth.permission.middleware';
import ValidationMiddleware from '../common/auth.validation.middleware';
import config from '../common/config/env.config';

const EDITOR = config.permissionLevels.EDITOR;

const routesConfig = (app) => {
  app.get('/schedules',[CourseInstancController.schedule_get_all]);
  app.get('/schedules/similar/:_id',[CourseInstancController.schedule_get_similar]);
  app.post('/schedule',[
                        ValidationMiddleware.validJWTNeeded,
                        PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
                        CourseInstancController.create_schedule]);
};

export default {routesConfig};
