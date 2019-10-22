# timetable-api
This is the backend/server-side exposing APIs to timetable (CSTT) application for institutions/departments/individuals to publish timetables online for easy accessibility to students, also for the creation of personal timetable by users.

# Timetable(CSTT)
Is an application to show the chart of the lecture/class schedules to take place at a particular time. Backend (server-side which is in this repo) is developed with Node JS, Express JS, and Mongo DB for database Frontend with Angular and can be found in https://github.com/penbosso/timetable-landing.

#### Prerequisites
Before you begin, make sure your development environment includes `Node.js®` and an `npm` package manager.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).


## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/penbosso/timetable-api

# go into app's directory
$ cd timetable-api

# install app's dependencies
$ npm install
```

## Usage

``` bash
# serve with nodemone watch at localhost:3600.
$ npm start

```

## API end points
| ------------------|:---------------------:|:---------------:|
| :heavy_check_mark:|POST: /users |Sign up user |
| :heavy_check_mark:|GET: /users |List of users|
| :heavy_check_mark:|GET: /users/:id |Retrive user with id |
| :heavy_check_mark:|PATCH: /users/:id |Update user with id |
| :heavy_check_mark:|DELETE: /users/:id |D elete user with id |
| :heavy_check_mark:|PUT: /users/editor/:id |Make user with id an editor |
| :heavy_check_mark:|PUT: /users/admin/:id |Make uset with id an admin |
| :heavy_check_mark:|POST: /auth |Authenticate user |
| :heavy_check_mark:|POST: /auth/refresh |Refresh auth. token |
| :heavy_check_mark:|GET: /schedules |List of public schedules |
| :heavy_check_mark:|GET: /schedules/:id |Retrive public schedule with id |
| :heavy_check_mark:|GET: /schedules/similar/:id |Retrive a public schedule and and schedules of the same course |
| :heavy_check_mark:|POST: /schedules |Create public schedule |
| :heavy_check_mark:|PUT: /schedules/:id |Edit a public schedule with id|
| :heavy_check_mark:|DELETE: /schedules/:id |Delete a public schedule with id|
| ------------------|:---------------------:|:---------------:|
| :heavy_check_mark:|GET: /courses |List of courses |
| :heavy_check_mark:|GET: /courses/:id |Retrive public schedule with id |
| :heavy_check_mark:|POST: /courses |Create course |
| :heavy_check_mark:|PUT: /courses/:id |Edit a course with id |
| :heavy_check_mark:|DELETE: /courses/:id |Delete a with id |
| ------------------|:---------------------:|:---------------:|
| :heavy_check_mark:|GET: /personal-schedules |List of private schedules |
| :heavy_check_mark:|GET: /personal-schedules/:id |Retrive private schedule with id |
| :heavy_check_mark:|POST: /personal-schedules |Create a private schedule |
| :heavy_check_mark:|PUT: /personal-schedules/:id |Edit a private schedule with id|
| :heavy_check_mark:|DELETE: /personal-schedules/:id |Delete a private schedule with id|
| ------------------|:---------------------:|:---------------:|
| :heavy_check_mark:|GET: /added-schedules/:id |List of user bookmarked schedules |
| :heavy_check_mark:|GET: /added-schedule/:id |Retrive bookmarked schedules with id |
| :heavy_check_mark:|POST: /added-schedules |bookmark a schedule |
| :heavy_check_mark:|DELETE: /added-schedules/:id |Delete a bookmarked schedule with id|
| | |Reminder/Notifications |
| | |Request for editor permission |

## Contributing
Your contribution is always welcome


## Creators

**Christian K. Bosso**

* <https://twitter.com/HD-penbosso>
* <https://github.com/penbosso>
