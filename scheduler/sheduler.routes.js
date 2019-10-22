import CourseInstancController from './courseInstance.controller';
import courseController from './course.controller';
import PersonalController from './personalSchedule.controller';
import AddedController from './addedSchedule.controller';
import PermissionMiddleware from '../common/auth.permission.middleware';
import ValidationMiddleware from '../common/auth.validation.middleware';
import config from '../common/config/env.config';

const EDITOR = config.permissionLevels.EDITOR;

const routesConfig = (app) => {
  app.get('/schedules',[
    CourseInstancController.schedule_get_all
  ]);
  app.get('/schedules/:id', [
    CourseInstancController.schedule_get_one
  ])
  app.get('/schedules/similar/:_id',[
    CourseInstancController.schedule_get_similar
  ]);
  app.post('/schedules',[
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
    CourseInstancController.create_schedule
  ]);
  app.put('/schedules/:id', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    CourseInstancController.schedule_update
  ]);

app.delete('/schedules/:id', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  CourseInstancController.schedule_delete
]);


app.get('/courses', [
  courseController.course_get_all
]);
app.get('/courses/:id', [
  courseController.course_get_one
]);
app.post('/courses', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
  courseController.create_course
]);
app.put('/courses/:id', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  courseController.course_update
]);
app.delete('/courses/:id', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  courseController.course_delete
]);


app.get('/personal-schedules', [
  ValidationMiddleware.validJWTNeeded,
  PersonalController.get_all
]);
app.get('/personal-schedules/:id', [
  ValidationMiddleware.validJWTNeeded,
  PersonalController.get_one
]);
app.post('/personal-schedules', [
  ValidationMiddleware.validJWTNeeded,
  PersonalController.create
]);
app.put('/personal-schedules/:id', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  PersonalController.update
]);
app.delete('/personal-schedules/:id', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  PersonalController.delete
]);


app.get('/added-schedules/:id',[
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  AddedController.my_list
]);
app.get('/added-schedule/:id', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  AddedController.get_one
]);
app.post('/added-schedules', [
  ValidationMiddleware.validJWTNeeded,
  AddedController.create
]);
app.delete('/added-schedules/:id', [
  ValidationMiddleware.validJWTNeeded,
  AddedController.delete
]);
};



export default {routesConfig};
