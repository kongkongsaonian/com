var gulp = require('gulp');
var webpack = require('gulp-webpack');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); // 重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
//var jshint = require('gulp-jshint'); // js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); // js压缩  
var concat = require('gulp-concat'); // 合并文件  
var imagemin = require('gulp-imagemin'); // 图片压缩
var browserSync = require('browser-sync').create();// 自动刷新浏览器处理
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
var source = require('vinyl-source-stream');

// gulp dev 开发环境下

function dev() {

    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src).pipe(sass({ style: 'expanded', }))
        .pipe(autoprefixer({browsers: ['last 4 versions', 'Android >= 4.0']}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(Config.sass.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * js处理 
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(webpack( require('./webpack.dev.js'))).pipe(rename({
            suffix: '.min'
        })).pipe(gulp.dest(Config.js.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * 图片处理 
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src).pipe(cache(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        }))).pipe(gulp.dest(Config.img.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * HTML处理 
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({
            stream: true
        }));
    });

    /**
     * 监控处理
     */
    gulp.task('dev', ['html:dev','sass:dev' , 'js:dev', 'assets:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist
            }
            , notify: false
        });
        // Watch .css files  
        //gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files  
        gulp.watch(Config.sass.src, ['sass:dev']);

        gulp.watch(Config.html.src, ['html:dev']);
        // Watch assets files  
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files  
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files  
        gulp.watch(Config.img.src, ['images:dev']);

    });
}
// gulp dev 开发环境下
module.exports = dev;
