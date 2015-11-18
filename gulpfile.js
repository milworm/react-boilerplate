var gulp = require('gulp'),
    yaml = require('gulp-yaml'),
    rename = require('gulp-rename'),
    change = require('gulp-change'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    nested = require('postcss-nested'),
    csswring = require('csswring'),
    gutil = require('gutil'),
    atImport = require('postcss-import'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('css-dev', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 1 version']
        }),
        mqpacker,
        csswring,
        atImport,
        nested
    ];

    return gulp.src('css/src/**/*.css')
        .pipe(postcss(processors))
        .on('error', gutil.log)
        .pipe(gulp.dest('css/dest'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('watch', function() {
    browserSync({
        server: {
            baseDir: ['./']
        }
    });

    watch('css/src/**/*.css', function() {
        gulp.start('css-dev');
    });

    watch('js/**/*.*', function() {
        reload();
    });

    watch('config/translations.yaml', function(file) {
        gulp.src('config/translations.yaml')
            .pipe(yaml({ space: 4 }))
            .pipe(change(function(content) {
                return content.replace(/\{/, 'window.translations = {');
            }))
            .pipe(rename(function(path) {
                path.extname = ".js";
            }))
            .pipe(gulp.dest('./config'))

        reload({
            stream: true
        });
    });
});