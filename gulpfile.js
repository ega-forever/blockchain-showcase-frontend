var gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  myth = require('gulp-myth'),
  browserSync = require('browser-sync').create(),
  bower = require('gulp-bower');


gulp.task('stylus', function () {
  gulp.src('./src/css/*.css')
    .pipe(stylus({
      use: ['nib']
    })) // собираем stylus
    .on('error', console.log)
    .pipe(myth())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  gulp.src([
      './src/js/**/*.js',
      './src/js/*.js'
    ])
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task("libs", function () {
  return bower()
    .pipe(gulp.dest('dist/libs/'));

});


gulp.task('jade', function () {
  gulp.src('./src/views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});


gulp.task('watch', function () {

  gulp.watch('./src/css/*.css', ['stylus', browserSync.reload]);
  gulp.watch('./src/views/*.jade', ['jade', browserSync.reload]);
  gulp.watch(['./src/js/**/*.js', './src/js/*.js'], ['js', browserSync.reload]);
});


gulp.task('build', function () {

  gulp.start('stylus');
  gulp.start('jade');
  gulp.start('js');
  gulp.start('libs');

});




gulp.task('start', ['browser-sync', 'build', 'watch']);
