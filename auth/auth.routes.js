import VerifyUserMiddleware from './verify.user.middleware';
import AuthorizationController from './auth.controller';
import AuthValidationMiddleware from '../common/auth.validation.middleware';
// export default {};

/* eslint-disable import/ignore */
exports.routesConfig = function (app) {

  app.post('/auth', [
      VerifyUserMiddleware.hasAuthValidFields,
      VerifyUserMiddleware.isPasswordAndUserMatch,
      AuthorizationController.login
  ]);

  app.post('/auth/refresh', [
      AuthValidationMiddleware.validJWTNeeded,
      AuthValidationMiddleware.verifyRefreshBodyField,
      AuthValidationMiddleware.validRefreshNeeded,
      AuthorizationController.login
  ]);
};
