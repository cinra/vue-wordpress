const pngquant = require('imagemin-pngquant');
// const mozjpeg = require('imagemin-mozjpeg');
const jpgtran = require('imagemin-jpegtran');
const imagemin = require('gulp-imagemin');
const chmod = require('gulp-chmod');

module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src([
      `${ PATH.src.img }/{,**/}*.{jpg,png,gif,svg,ico}`,
      `!${ PATH.src.img }/sprite/{,**/}*.png`,
      ])
      //.pipe(chmod(777))
      .pipe(imagemin({
        optimizationLevel: 6,
        multipass: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [ jpgtran({ quality: 75, progressive: true }), pngquant({ quality: 60-80, speed: 1}) ]
      }))
      //.pipe(chmod(644))
      .pipe(gulp.dest(`${ PATH.dist }/${ PATH.img }/`))
  }
}