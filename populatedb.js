const chalk = require('chalk');
const mongoose = require('mongoose');
const async = require('async');
const User = require('./user/user.model');
const Course = require('./scheduler/course.model');
const CourseInstance = require('./scheduler/courseInstance.model');
import crypto from 'crypto';

console.log(chalk.blue("This scripts creates some users, course, courseInstance"));

const dbUrl = "mongodb+srv://db_user:chri5t@cluster0-mitxy.mongodb.net/timetable?retryWrites=true&w=majority";
mongoose.connect( dbUrl, {useNewUrlParser: true})
.then(() => console.log(chalk.green("Successfully connected to the database")));

User.deleteMany({}).exec();
Course.deleteMany({}).exec();
CourseInstance.deleteMany({}).exec();

const users = [];
const courses = [];
const courseInstances = [];

const userCreate = (firstName, lastName, email, password, permissionLevel, cb) => {
  let salt = crypto.randomBytes(16).toString('base64');
 const userdetail = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    password: crypto.createHmac('sha512',salt).update(password).digest("base64"),
    permissionLevel:permissionLevel
  };

  const user = new User(userdetail);

  user.save( (err) => {
    if(err) {
      cb(err, null)
      return;
    }
    console.log(chalk.green('New User: ' + user));
    users.push(user);
    cb(null, user);
  });
}


const courseCreate = (code, title, description, level, department, user, cb) => {
  const coursedetail = {
    code:code,
    title:title,
    description:description,
    level:level,
    department:department,
    user:user
  };

  const course = new Course(coursedetail);
  course.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
  console.log(chalk.green('New Course: ' + course));
  courses.push(course);
  cb(null, course)
  });
}

const courseInstance = (venue, lecturer, group, day, start_time, end_time,course, cb) => {
  const courseInstancedetail = {
    venue: venue,
    lecturer: lecturer,
    group: group,
    day: day,
    start_time: start_time,
    end_time: end_time,
    course:course
  };

  const courseinstance = new CourseInstance(courseInstancedetail);
  courseinstance.save((err) => {
    if (err) {
      console.log(chalk.red('ERRor CREATINg CourInstance:' + courseInstance));
      cb(err, null);
      return;
    }
    console.log(chalk.green('New Course Instance: ' + courseinstance));
    courseInstances.push(courseinstance);
    cb(null, courseinstance);
  });
}

const createUsers = cb => {
  async.series([
    callback => {
      userCreate('Peter', 'Rouss', 'ro@test.co', 'password', 1, callback);
    },
      callback => {
        userCreate('Patrick', 'Rothfuss', 'pat@test.co', 'password', 1, callback);
      },
      callback => {
        userCreate('Ben', 'Bova', 'ben@test.co', 'password', 2, callback);
      },
      callback => {
        userCreate('Isaac', 'Asimov', 'asi@test.co', 'password', 3, callback);
      }
      ],
      // optional callback
      cb);
}

const createCourses = cb => {
  async.parallel([
    callback => {
      courseCreate ('CSCD 111', 'Computer Science', 'description Introduction to Computer Science', 'level 100', 'Computer Science', users[3], callback);
    },
    callback => {
      courseCreate ('CSIT 101', 'Infomation Technology', 'description of Introduction to Infomation Technology', 'level 100', 'Infomation Technology', users[2], callback);
    },
    callback => {
      courseCreate ('CSCD 201', 'Information Systems', 'description ;-Information Systems', 'level 200', 'Computer Science', users[3], callback);
    },
    callback => {
      courseCreate ('CSIT 201', 'Networking', 'description of Introduction to computer network communications', 'level 200', 'Infomation Technology', users[2], callback);
    },
    callback => {
      courseCreate ('CSCD 211', 'Programing II', 'description Introduction to Java programming', 'level 200', 'Computer Science', users[3], callback);
    },
    callback => {
      courseCreate ('CSIT 213', 'Web Technology', 'description of Introduction to Web Technology', 'level 200', 'Infomation Technology', users[2], callback);
    },
    callback => {
      courseCreate ('CSCD 311', 'Software Engineering', 'description Introduction to Software Engineering', 'level 300', 'Computer Science', users[3], callback);
    },
    callback => {
      courseCreate ('CSIT 315', 'Database Managment Systems', 'description of Introduction toDatabase Managment Systems', 'level 300', 'Infomation Technology', users[2], callback);
    },
    callback => {
      courseCreate ('CSCD 317', 'Digital Systems', 'description ;-Information Systems', 'level 300', 'Computer Science', users[3], callback);
    },
    callback => {
      courseCreate ('CSIT 301', 'Networking II', 'description of Introduction to computer network communications II', 'level 300', 'Infomation Technology', users[2], callback);
    },
    callback => {
      courseCreate ('CSCD 301', 'Programing III', 'description Introduction to VB.net programming', 'level 300', 'Computer Science', users[3], callback);
    },
    callback => {
      courseCreate ('CSIT 313', 'Web Technology II', 'description of Introduction to Web Technology II', 'level 300', 'Infomation Technology', users[2], callback);
    }
  ],
  cb);
}

const createCourseInstances = cb => {
  async.parallel([

    callback => {
      courseInstance ('Software Lab', 'Nii Addotey', 'A', 'Monday', '11:30', '12:20', courses[0], callback);
    },
    callback => {
      courseInstance ('Software Lab', 'Nii Addotey', 'B', 'Tuesday', '08:30', '09:20',courses[0], callback);
    },
    callback => {
      courseInstance ('JQB 23', 'Nii Addotey', '', 'Friday', '07:30', '09:20',courses[0], callback);
    },
    callback => {
      courseInstance ('Hardware Lab', 'Nana Adjei', 'B', 'Wednesday', '15:30', '16:20',courses[1], callback);
    },
    callback => {
      courseInstance ('JQB 9', 'Nana Adjei', '', 'Tuesday', '07:30', '09:20',courses[1], callback);
    },
    callback => {
      courseInstance ('KAB', 'Edem Kuma', '', 'Monday', '08:30', '09:20',courses[2], callback);
    },
    callback => {
      courseInstance ('Software Lab', 'Edem Kuma', '', 'Thurday', '13:30', '15:20',courses[2], callback);
    },
    callback => {
      courseInstance ('JQB 9', 'Dr. Pius Koah', '', 'Friday', '17:30', '16:20',courses[3], callback);
    },
    callback => {
      courseInstance ('JQB 16', 'Dr. Pius Koah', '', 'Wednesday', '07:30', '09:20',courses[3], callback);
    },
    callback => {
      courseInstance ('NNB 2', 'Prof S.K Mane', '', 'Tuesday', '13:30', '14:20',courses[4], callback);
    },
    callback => {
      courseInstance ('JQB 9', 'Prof S.K Mane', '', 'Thursday', '07:30', '09:20',courses[4], callback);
    },callback => {
      courseInstance ('N 1', 'Mr Kalus Adei', '', 'Friday', '11:30', '12:20',courses[5], callback);
    },
    callback => {
      courseInstance ('N 2', 'Mr Kalus Adei', 'B', 'Monday', '13:30', '15:20',courses[5], callback);
    },
    callback => {
      courseInstance ('JQB 9', 'Oman Kuh', '', 'Wednesday', '09:30', '10:20',courses[6], callback);
    },
    callback => {
        courseInstance ('Hardware Lab', 'Oman Kuh', 'B', 'Wednesday', '13:30', '15:20',courses[6], callback);
      },
    callback => {
      courseInstance ('JQB 9', 'Evans P. Boa', '', 'Tuesday', '13:30', '15:20',courses[7], callback);
    },
    callback => {
      courseInstance ('NNB 3', 'Evans P. Boa', '', 'Monday', '09:30', '10:20',courses[7], callback);
    },
    callback => {
      courseInstance ('Korean Lab', 'Oman Kuh', '', 'Thurday', '14:30', '15:20',courses[8], callback);
    },
    callback => {
      courseInstance ('JQB 9', 'Oman Kuh', '', 'Friday', '07:30', '09:20',courses[8], callback);
    },
    callback => {
      courseInstance ('JQB 5', 'Prof S.K Mane', '', 'Wednesday', '17:30', '19:20',courses[9], callback);
    },
    callback => {
      courseInstance ('Chinise Lab', 'Prof S.K Mane', '', 'Tuesday', '13:30', '15:20',courses[9], callback);
    },
    callback => {
      courseInstance ('JQB 19', 'Penbon Luma', '', 'Thursday', '17:30', '18:20',courses[10], callback);
    },callback => {
      courseInstance ('JQB 12', 'Penbon Luma', '', 'Friday', '07:30', '09:20',courses[10], callback);
    },
    callback => {
      courseInstance ('NNB 2', 'Prof S.K Mane', 'B', 'Monday', '13:30', '15:20',courses[11], callback);
    },
    callback => {
      courseInstance ('JQB 14', 'Prof S.K Mane', '', 'Wednesday', '07:30', '09:20',courses[11], callback);
  }
  ],
  cb);
}

async.series([
  createUsers,
  createCourses,
  createCourseInstances
],
(err, results) => {
  if(err) {
    console.log(chalk.blue('Final Err:' + err));
  }
  else {
    console.log(chalk.green('Courseinstance: ' + courseInstances));
  }
  // All done, disconnect from database
  mongoose.connection.close();
});



