'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const concat = require('gulp-concat');
const terser = require('gulp-terser');

const ftp = require('vinyl-ftp');

const ftpPath     = ''; // e.g /folder/subfolder/wp-content/themes/custom-theme
const ftpHost     = '';
const ftpUser     = '';
const ftpPassword = '';

const conn = ftp.create({
  host: ftpHost,
  user: ftpUser,
  password: ftpPassword,
  parallel: 5,
});
const deployGlobs = ['./**/*.php', './style.css', './scripts.js'];

function cssTask() {
  return gulp
    .src('./sass/style.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer('last 4 versions'))
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(gulp.dest('./'));
}

function jsTask() {
  return gulp
    .src(['./js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(terser({
      keep_fnames: true,
      mangle: false
    }))
    .pipe(gulp.dest('./'));
}

function deployTask() {
  return gulp
    .src(deployGlobs, {
      base: '.',
      buffer: false,
      allowEmpty: true,
    })
    .pipe(conn.newer(ftpPath))
    .pipe(conn.dest(ftpPath));
}

function deployAll() {
  return gulp
    .src(deployGlobs, {
      base: '.',
      buffer: false,
      allowEmpty: true,
    })
    .pipe(conn.dest(ftpPath));
}

function watchFiles() {
  gulp.watch(['./sass/**/*.scss'], gulp.series(cssTask, deployTask));
  gulp.watch('./js/**/*.js', gulp.series(jsTask, deployTask));
  gulp.watch('./**/*.php', deployTask);
}

const watch = watchFiles;

exports.build = gulp.series(jsTask, cssTask);
exports.deploy = deployTask;
exports.depall = deployAll;
exports.watch = watch;
exports.default = watch;