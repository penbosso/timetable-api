import UserController from './user.controller';
import PermissionMiddleware from '../common/auth.permission.middleware';
import ValidationMiddleware from '../common/auth.validation.middleware';
import config from '../common/config/env.config';


const ADMIN = config.permissionLevels.ADMIN;
const EDITOR = config.permissionLevels.EDITOR;
const NORMAL_USER = config.permissionLevels.NORMAL_USER;

const routesConfig = function (app) {
  app.post('/users', [
    UserController.insert
  ]);
  app.get('/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(EDITOR),
    UserController.list
  ]);
  app.get('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UserController.getById
  ]);
  app.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UserController.patchById
  ]);
  app.delete('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UserController.removeById
  ]);

}


export default {routesConfig};
