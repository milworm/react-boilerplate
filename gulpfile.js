var gulp = require('gulp'),
    yaml = require('gulp-yaml'),
    rename = require('gulp-rename'),
    change = require('gulp-change'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('watch', function() {
    browserSync({
        server: {
            baseDir: ['./']
        }
    });

    //watch('app/scss/**/*.scss', function() {
    //    gulp.start('css-dev');
    //});

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