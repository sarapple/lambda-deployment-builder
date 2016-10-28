var gulp = require('gulp');

require('./lambda_deploy.js');

gulp.task(
  'default',
  gulp.series(
    'lambda:deploy'
  )
);
