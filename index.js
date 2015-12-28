var fs = require('fs');

var Handlebars = require('handlebars');
var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');

Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/layouts/partials/footer.hbt').toString());
Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/layouts/partials/head.hbt').toString());
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/layouts/partials/header.hbt').toString());
Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/layouts/partials/nav.hbt').toString());
Handlebars.registerPartial('warning', fs.readFileSync(__dirname + '/layouts/partials/warning.hbt').toString());

var debug = function(options) {
    return (function(files, metalsmith, done) {
        console.log(files);
        console.log(metalsmith.metadata());
        done();
    });
};


Metalsmith(__dirname)
    .use(collections({
        pages: {
            pattern: "pages/*.md",
        },
        posts: {
            pattern: "posts/*.md",
            sortBy: "date",
            reverse: true,
        },
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ":slug",
        linksets: [{
            match: {collection: "posts"},
            pattern: ":date/:slug",
        },
        {
            match: { collection: "pages"},
            pattern: ":slug",
        }],
    }))
    .use(layouts({
        engine: "handlebars",
        directory: "./layouts",
        partials: "./layouts/partials",
    }))
    .source("./src/content")
    .destination("./build")
    .build(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Site built correctly");
        }
    });


