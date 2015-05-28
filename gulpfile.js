var gulp         = require('gulp');
var sass         = require('gulp-sass');
var includes     = require('gulp-file-include');
var size         = require('gulp-size');
var svgmin       = require('gulp-svgmin');
var svgstore     = require('gulp-svgstore');
var autoprefixer = require('gulp-autoprefixer');
var cheerio      = require('gulp-cheerio');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync');


var paths = {
  sass: './src/assets/scss/*.scss',
  js: './src/assets/js/*.js',
  vendor: './vendor/',
  img: './src/assets/images/**',
  files: './src/files/**',
  templates: ['src/**/*.html', '!src/inc/**/*.html'],
  icons: './bower_components/justafewicons/icons/*',
  build: './build/'
};


gulp.task('styles', function(){
  return gulp.src(paths.sass)
    .pipe(size())
    .pipe(sass({style: 'compressed'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('stylesheets/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('icons', function () {
  return gulp.src(paths.icons)
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg').addClass('hide');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest('./src/inc/'));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(plumber())
    .pipe(includes({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(gulp.dest('./'));
});


gulp.task('connect', function(){
  browserSync.init({
    server: './'
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.icons, ['icons']);
});


gulp.task('build', ['templates', 'styles', 'icons']);
gulp.task('default', ['build', 'connect', 'watch']);
