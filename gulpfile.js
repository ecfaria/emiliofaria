// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mainBowerFiles = require('main-bower-files');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minify our images
gulp.task('images', function () {
    return gulp.src('app/img/*')
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('dist/img'));
});

// Compile Our Less
gulp.task('less', function() {
    return gulp.src('app/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Bower packages
gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest("./dist/js/vendor"))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('bower_components/*', ['images']);
    gulp.watch('app/img/*', ['images']);
    gulp.watch('app/js/*.js', ['lint', 'scripts']);
    gulp.watch('app/less/components/*.less', ['less']);
    gulp.watch('app/less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['images', 'lint', 'less', 'scripts', 'bower-files', 'watch']);