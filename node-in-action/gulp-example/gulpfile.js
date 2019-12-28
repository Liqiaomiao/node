const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const defaultTask = () => {
    gulp.src('app/*.jsx') // 用gulp自带的文件聚焦工具 gulp.src 查找所有的React jsx文件
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
}
gulp.task('default', () =>
    defaultTask()
)
gulp.task('watch', () => {
    watch('app/*.jsx', () => {
        defaultTask()
    });
});

