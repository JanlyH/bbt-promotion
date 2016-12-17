// 引入 gulp
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

// 编译Sass
gulp.task('sass', function(){
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
})

// // 压缩css
// gulp.task('minCss', function() {
//     gulp.src('assets/css/**/*.css')
//         .pipe(mincss())
//         .pipe(gulp.dest('dist/assets/css'));
// });

// // 压缩JS
// gulp.task('minJs', function(){
//     gulp.src('assets/js/**/*.js')
//         .pipe(minjs())
//         .pipe(gulp.dest('dist/assets/js'))
// });

// //清除
// gulp.task('clean', function(){
//     return gulp.src('dist', {read: false})
//         .pipe(clean());
// })

// //html自动引入带版本号js和css
// gulp.task('jsp', function(){
//     gulp.src('./**/*.jsp')
//         .pipe(revEasy({
//             transformPath:function(orgpath, ver){
//               var newpath = "http://assets.baobeituan.com" + orgpath 
//                               + (orgpath.indexOf('?') > -1 ? "&" : "?")  
//                               + "v=" + ver;
//               return newpath;
//             }
//         }))
//         .pipe(gulp.dest('dist'));
// })
// 自动刷新
gulp.task('browser-sync', ['sass'], function() {
   browserSync.init({
        files: '**',
        server: {
            baseDir: "./"
        },
        port: 8081
    });
   gulp.watch('sass/**/*.scss', ['sass']);
});

// 默认任务
gulp.task('default', ['browser-sync']);
