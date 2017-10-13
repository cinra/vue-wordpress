const _gzip = require('gulp-gzip');

module.exports = (gulp, PATH, $) => {

  let task_css = gulp.src(`${ PATH.dist }/${ PATH.css }/*.min.css`)
    .pipe(_gzip({
      append: true,
      gzipOptions: {
        level: 9
      }
    }))
    .pipe(gulp.dest(`${ PATH.dist }/${ PATH.css }/`))

  let task_js = gulp.src(`${ PATH.dist }/${ PATH.js }/*.min.js`)
    .pipe(_gzip({
      append: true,
      gzipOptions: {
        level: 9
      }
    }))
    .pipe(gulp.dest(`${ PATH.dist }/${ PATH.js }/`))

  // let compress_task = () => {
  //   $.merge(task_js, task_css);
  // };

  // return compress_task;
  return () => { task_css };
}