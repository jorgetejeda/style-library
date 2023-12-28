const { src, watch, dest, series, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const copy = require('gulp-copy');
const notify = require('gulp-notify');

// Compile Sass files
function buildStyles() {
  return src('./src/index.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    // FIXME: Validate why font files disappear when css is minified
    // .pipe(cssnano())
    .pipe(dest('dist'));
}

function moveFonts() {
  return src('src/assets/font/**/*')
  .pipe(copy('dist/assets/font', { prefix: 3 }));
}

function moveImages() {
  return src('src/assets/images/**/*')
  .pipe(copy('dist/assets/images', { prefix: 3 }));
}

// Watch for changes in Sass files
function watchTask() {
  watch(['./src/*.scss'], buildStyles);
}

// Default task
exports.default = series(moveFonts, moveImages, buildStyles, watchTask)