const gulp          = require('gulp');
const watch         = require('gulp-watch');
const sourcemaps    = require('gulp-sourcemaps');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const rimraf        = require('rimraf');
const connect       = require('gulp-connect');
const browserify    = require('browserify');
const babelify      = require('babelify');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');

const path = {
  dist: {
    js:'./dist',
    libs: './dist/libs',
  },
  src: {
    js:'src/**/*.js',
    css:'src/**/*.css',
    all:'src/**/*',
    html:"src/*.html"
  }
}

const config = {
      base: 'http://localhost',
      port: 9000,
      root: path.dist.js,
      livereload: true
};

const tasks = {
  jsBuild : 'js:build',
  cssBuild : 'css:build',
  htmlBuild: 'html:build',
  libs: 'libs',
  serv: 'serv',
  jsWatch: 'js:watch',
  clean: 'clean',
  start: 'start'
};


gulp.task(tasks.jsBuild , () => {
  try{
    return browserify({entries: 'src/js/index.js', debug: true})
              .transform(babelify,{ "presets": ["es2015"] })
              .bundle()
              .pipe(source('all.js'))
              .pipe(buffer())
              .pipe(sourcemaps.init({loadMaps: true}))
              .pipe(uglify())
              .pipe(sourcemaps.write('./maps'))
              .pipe(gulp.dest(path.dist.js))
              .pipe(connect.reload( ));
  }catch(e){console.log(e);}
});

gulp.task(tasks.cssBuild, function () {
  gulp.src(path.src.css)
     .pipe(sourcemaps.init({loadMaps: true}))
     .pipe(sass({debug:true}))
     .pipe(autoprefixer())
     .pipe(sourcemaps.write('./maps'))
     .pipe(gulp.dest(path.dist.js))
     .pipe(connect.reload());
});

gulp.task(tasks.htmlBuild, function() {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.dist.js))
		.pipe(connect.reload());
});

gulp.task(tasks.serv, ()=>{
    connect.server(config);
  });

gulp.task(tasks.jsWatch , () => {
  watch([path.src.js],  ()=>gulp.start(tasks.jsBuild));
  watch([path.src.html],()=>gulp.start(tasks.htmlBuild));
  watch([path.src.css], ()=>gulp.start(tasks.cssBuild));
});

gulp.task(tasks.clean, (cb)=>{
  console.log(cb);
  rimraf(path.dist.js, cb);
})



gulp.task(tasks.start, [tasks.jsBuild,tasks.cssBuild, tasks.htmlBuild, tasks.serv, tasks.jsWatch]);
