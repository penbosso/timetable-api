import CourseInstancController from './courseInstance.controller';
import courseController from './course.controller';
import PersonalController from './personalSchedule.controller';
import AddedController from './addedSchedule.controller';
import PermissionMiddleware from '../common/auth.permission.middleware';
import ValidationMiddleware from '../common/auth.validation.middleware';
import config from '../common/config/env.config';

const EDITOR = config.permissionLevels.EDITOR;

const routesConfig = (app) => {
  app.get('/schedules',[CourseInstancController.schedule_get_all]);
  app.get('/schedules/:id', CourseInstancController.schedule_get_one)
  app.get('/schedules/similar/:_id',[CourseInstancController.schedule_get_similar]);
  app.post('/schedule',[
                          ValidationMiddleware.validJWTNeeded,
                          PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
                          CourseInstancController.create_schedule
                      ]);;
app.put('/schedules/:id', [
                          CourseInstancController.schedule_update
                        ]);
app.delete('/schedules/:id', CourseInstancController.schedule_delete);


app.get('/courses', courseController.course_get_all);
app.get('/courses/:id', courseController.course_get_one);
app.post('/courses', courseController.create_course);
app.put('/courses/:id', courseController.course_update);
app.delete('/courses/:id', courseController.course_delete);


app.get('/personal-schedules', PersonalController.get_all);
app.get('/personal-schedules/:id', PersonalController.get_one);
app.post('/personal-schedules', PersonalController.create);
app.put('/personal-schedules/:id', PersonalController.update);
app.delete('/personal-schedules/:id', PersonalController.delete);


app.get('/added-schedules/:id', AddedController.my_list);
app.get('/added-schedules/:id', AddedController.get_one);
app.post('/added-schedules', AddedController.create);
app.delete('/added-schedules/:id', AddedController.delete);
};



export default {routesConfig};
