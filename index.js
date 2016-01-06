var fs = require('fs');

var f           = require('d3-format');
var Handlebars  = require('handlebars');
var Moment      = require('moment');
var removemd    = require('remove-markdown');

var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var sass        = require('metalsmith-sass');
var serve       = require('metalsmith-serve');
var tags        = require('metalsmith-tags');
var watch       = require('metalsmith-watch');
var wordcount   = require('metalsmith-word-count');

// partial definitions
Handlebars.registerPartial('citation', fs.readFileSync(__dirname + '/layouts/partials/citation.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/layouts/partials/footer.hbt').toString());
Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/layouts/partials/head.hbt').toString());
Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/layouts/partials/header.hbt').toString());
Handlebars.registerPartial('list', fs.readFileSync(__dirname + '/layouts/partials/list.hbt').toString());
Handlebars.registerPartial('postdata', fs.readFileSync(__dirname + '/layouts/partials/postdata.hbt').toString());
Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/layouts/partials/nav.hbt').toString());
Handlebars.registerPartial('warning', fs.readFileSync(__dirname + '/layouts/partials/warning.hbt').toString());

// helper definitions
Handlebars.registerHelper('humanise', function(num) {
    // takes a number and then uses d3-format to render it in a reasonable
    // and more human readable form.
    return (f.format('.2s')(num));
});

Handlebars.registerHelper('moment', function(date, format) {
    // takes a date and formats it appropriately
    return Moment(date).format(format);
});

var excerpt = function(options) {
    // creates excerpts from the markdown using the first para that is actually
    // a paragraph of contnet not an image etc.
    return (function(files, metalsmith, done) {
        for (var file in files) {
            // just look at markdown files.
            if (file.endsWith(".md")) {
                if (! files[file].excerpt) {
                    var contents = files[file].contents.toString();
                    var patt = /^\w.+?\n/m;
                    var m = patt.exec(contents);
                    if (m) {
                        files[file].excerpt = removemd(m[0]);
                    }
                }
                //console.log(file);
                //console.log(files[file].excerpt);
            }
        }
        done();
    });
};

var debug = function(options) {
    return (function(files, metalsmith, done) {
        for (var file in files) {
            console.log(file);
        }
        done();
    });
};

Metalsmith(__dirname)
    .metadata({
        site: {
            url: "http://ajfisher.me",
        }
    })
    .use(watch({
        paths: {
            "$(source)/**/*": "**/*.md",
            "layouts/**/*": "**/*.md",
            "index.js": "**/*.md",
            "src/css/**/*": "**/*",
        }
    }))
    .use(collections({
        pages: {
            pattern: "content/pages/*.md",
			refer: false,
        },
        posts: {
            pattern: "content/posts/*.md",
            sortBy: "date",
            reverse: true,
            refer: false,
        },
    }))
    .use(excerpt())
    .use(markdown())
    .use(wordcount({
        metaKeyCount: "wordcount",
        metaKeyReadingTime: "readingtime",
        seconds: false,
        raw: true,
    }))
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
    .use(tags({
        handle: 'tags',
        path: 'tagged/:tag/index.html',
        layout: 'blog.hbt',
        sortBy: 'date',
        reverse: true,
    }))
    .use(layouts({
        engine: "handlebars",
        directory: "./layouts",
        partials: "./layouts/partials",
    }))
    .source("./src")
    .destination("./build")
    .use(sass({
        outputDir: 'css/',
        watch: 'src/css/**/*',
    }))
    .use(serve({
        cache: 0,
        verbose: true,
        host: '0.0.0.0',
    }))
    .build(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Site built correctly");
        }
    });
