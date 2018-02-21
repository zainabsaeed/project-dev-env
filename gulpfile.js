const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const sourcemap = require('gulp-sourcemaps');
const lessAutoprefix = require('less-plugin-autoprefix');
const browserSync = require('browser-sync');

var autoprefix = new lessAutoprefix({ browsers: ['last 2 versions'] });

var lessDir = 'src/assets/less/'

//html task minify 
gulp.task('html-minify', function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist'));
});

//less task minify

gulp.task('less', function(){
    gulp.src(lessDir + 'main.less')
        .pipe(sourcemap.init())
        .pipe(less({
            plugin: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(cleanCss())
        .pipe(sourcemap.write('/maps'))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(browserSync.stream());
});

// task watch, build and server

gulp.task('serve', function(){
    browserSync.init({
        server: "dist"
    });
    gulp.watch('src/*.html', ['html-minify']);
    gulp.watch('src/assets/image/*', ['image-minify']);
    gulp.watch(lessDir + '**/*less', ['less']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

//Default task
gulp.task('default', ['html-minify', 'image-minify', 'less', 'serve']);