/* eslint-disable import/ignore */
module.exports = {
  "db-url-test": "mongodb+srv://db_user:chri5t@cluster0-mitxy.mongodb.net/test?retryWrites=true&w=majority",
  "db-url": "mongodb+srv://db_user:chri5t@cluster0-mitxy.mongodb.net/timetable?retryWrites=true&w=majority",
  "port": 3600,
  "appEndpoint": "http://localhost:3600",
  "apiEndpoint": "http://localhost:3600",
  "jwt_secret": "myS33!!creeeTs",
  "jwt_expiration_in_seconds": 36000,
  "environment": "dev",
  "permissionLevels": {
      "NORMAL_USER": 1,
      "EDITOR": 2,
      "ADMIN": 3
  }
};
