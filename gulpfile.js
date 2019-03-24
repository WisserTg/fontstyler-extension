/**
 * Gulpfile.js gulp module.
 */
const gulp = {
    module: require("gulp"),
    additional: {
        uglifyes: require("gulp-uglifyes"),
        uglifycss: require("gulp-uglifycss"),
        concat: require("gulp-concat"),
        rename: require("gulp-rename")
    }
};


const tasks = {
    client: function (callback) {
        // JS and CSS
        gulp.module.src(["source/client/static/**/*.js", "!source/client/static/**/*.min.js"]).pipe(gulp.additional.uglifyes()).pipe(gulp.additional.rename({suffix: ".min"})).pipe(gulp.module.dest("build/client/static"));
        gulp.module.src(["source/client/static/**/*.min.js"]).pipe(gulp.module.dest("build/client/static"));
        gulp.module.src(["source/client/static/**/*.css", "!source/client/static/**/*.min.css"]).pipe(gulp.additional.uglifycss()).pipe(gulp.additional.rename({suffix: ".min"})).pipe(gulp.module.dest("build/client/static"));
        gulp.module.src(["source/client/static/**/*.min.css"]).pipe(gulp.module.dest("build/client/static"));

        // HTML
        gulp.module.src(["source/client/popup.html"]).pipe(gulp.module.dest("build/client"));

        // Other files
        gulp.module.src(["source/client/static/**/*", "!source/client/static/**/*.js", "!source/client/static/**/*.css"]).pipe(gulp.module.dest("build/client/static"));

        callback();
    },
    content: function (callback) {
        gulp.module.src("source/content/**/*.js").pipe(gulp.additional.rename({suffix: ".min"})).pipe(gulp.additional.uglifyes()).pipe(gulp.module.dest("build/content"));

        callback();
    },
    manifest: function (callback) {
        gulp.module.src("source/manifest.json").pipe(gulp.module.dest("build"));
        gulp.module.src("source/static/**/*").pipe(gulp.module.dest("build/static"));

        callback();
    }
};


(function () {
    for (const key in tasks) {
        const func = tasks[key];

        gulp.module.task(key, func);
    }

    gulp.module.task("default", gulp.module.series(tasks.client, tasks.content, tasks.manifest));
})();
