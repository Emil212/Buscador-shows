const { series, src, dest, watch } = require("gulp");

//Utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

//Utilidades JS

const terser = require("gulp-terser-js");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

const paths = {
  css: "src/css/**/*.css",
  js: "src/js/**/*",
};

function css() {
  return src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./build/css"));
}

function javascript() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(rename({ sufix: ".min" }))
    .pipe(dest("./build/js"));
}

function watchArchivos() {
  watch(paths.css, css); //Compila al guardar cambios, la sintaxis de los * se recorren todas las carpetas
  watch(paths.js, javascript);
}

exports.css = css;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, watchArchivos);
