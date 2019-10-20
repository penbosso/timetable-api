import CourseInstancController from './courseInstance.controller';
import courseController from './course.controller'
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


app.get('courses', courseController.course_get_all);
app.get('/courses/:id', courseController.course_get_one);
app.post('/courses', courseController.create_course);
app.put('/courses/:id', courseController.course_update);
app.delete('/courses/:id', courseController.course_delete);
};



export default {routesConfig};
