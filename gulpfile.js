var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    svgstore     = require('gulp-svgstore'),
    svgmin       = require('gulp-svgmin');


gulp.task('watch', function(){
    gulp.watch('svg/*svg', ['svg']);
});


gulp.task('svg', function () {
  return gulp.src('icons/*.svg')
             .pipe(svgmin())
             .pipe(svgstore({ fileName: 'defs-block.svg', prefix: 'icon-'}))
             .pipe(gulp.dest('./'));
});

gulp.task('default', ['svg', 'watch']);
