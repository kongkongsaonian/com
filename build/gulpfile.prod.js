var gulp = require('gulp');
var webpack = require('gulp-webpack');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
//var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
var imagemin = require('gulp-imagemin'); //图片压缩 
var Config = require('./gulpfile.config.js');
var rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    assetRev = require('gulp-asset-rev'),
    runSequence = require('run-sequence');
// gulp build 打包资源
function prod() {

    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass', function () {
        return gulp.src(Config.sass.src).pipe(sass()).pipe(autoprefixer({browsers: ['last 4 versions', 'Android >= 4.0']})).pipe(cssnano())
            .pipe(rename({
            suffix: '.min'
        })).pipe(rev())
        .pipe(gulp.dest(Config.sass.dist)).pipe(rev.manifest())
        .pipe(gulp.dest('md5json/sass'))
    });
    /** 
     * js处理 
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src).pipe(webpack(require('./webpack.prod.js'))).pipe(rename({
            suffix: '.min'
        })).pipe(rev()).pipe(gulp.dest(Config.js.dist)).pipe(rev.manifest())
        .pipe(gulp.dest('md5json/js'));
    });
    /** 
     * 图片处理 
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        })).pipe(gulp.dest(Config.img.dist));
    });
    /** 
     * HTML处理 
     */
    gulp.task('html', function () {
        return gulp.src(['md5json/**/rev-manifest.json', Config.html.src]).pipe(revCollector({
             replaceReved: true
        })).pipe(gulp.dest(Config.html.dist));
    });
    /**
     * 整体处理
     */
    gulp.task('build', runSequence('sass', 'js', 'assets', 'images', 'html'));
}
module.exports = prod;