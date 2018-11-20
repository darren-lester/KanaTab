"use strict";

var gulp = require("gulp");

var jshint = require("gulp-jshint");
var del = require("del");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var jsonminify = require("gulp-jsonminify");
var mocha = require("gulp-mocha");

gulp.task("lint", function() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("clean-dev", function() {
  return del(["dev/**/*"]);
});

gulp.task("clean-dist", function() {
  return del(["dist/**/*"]);
});

gulp.task("clean-tmp", function() {
  return del(["tmp/**/*"]);
});

gulp.task("html-dev", ["clean-dev"], function() {
  return gulp.src("src/*.html").pipe(gulp.dest("dev/"));
});

gulp.task("html-dist", ["clean-dist"], function() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("json-dev", ["clean-dev"], function() {
  return gulp.src("src/*.json").pipe(gulp.dest("dev/"));
});

gulp.task("json-dist", ["clean-dist"], function() {
  return gulp
    .src("src/*.json")
    .pipe(jsonminify())
    .pipe(gulp.dest("dist/"));
});

gulp.task("images-dev", ["clean-dev"], function() {
  return gulp.src("src/**/*.png").pipe(gulp.dest("dev/"));
});

gulp.task("images-dist", ["clean-dist"], function() {
  return gulp.src("src/**/*.png").pipe(gulp.dest("dist/"));
});

gulp.task("babel", ["clean-tmp"], function() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest("tmp/"));
});

gulp.task("mainscripts-dev", ["babel"], function() {
  return gulp
    .src([
      "tmp/kanatab.js",
      "tmp/background.js",
      "tmp/options.js",
      "tmp/theme.js"
    ])
    .pipe(browserify({}))
    .pipe(gulp.dest("dev/scripts"));
});

gulp.task("mainscripts-dist", ["babel"], function() {
  return gulp
    .src([
      "tmp/kanatab.js",
      "tmp/background.js",
      "tmp/options.js",
      "tmp/theme.js"
    ])
    .pipe(browserify({}))
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("scripts-dev", ["babel"], function() {
  return gulp.src(["tmp/options.js"]).pipe(gulp.dest("dev/scripts"));
});

gulp.task("scripts-dist", ["babel"], function() {
  return gulp
    .src(["tmp/options.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("styles-dev", ["clean-dev"], function() {
  return gulp
    .src("src/style/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dev/style/"));
});

gulp.task("styles-dist", ["clean-dist"], function() {
  return gulp
    .src("src/style/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("dist/style/"));
});

gulp.task("default", ["lint"]);
gulp.task("dev", [
  "html-dev",
  "json-dev",
  "images-dev",
  "mainscripts-dev",
  "scripts-dev",
  "styles-dev"
]);
gulp.task("build", [
  "html-dist",
  "json-dist",
  "images-dist",
  "mainscripts-dist",
  "scripts-dist",
  "styles-dist"
]);
