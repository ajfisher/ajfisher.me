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

// determine if we're building for production or not
var prod = false;
if (process.argv[2] == "production") {
    prod = true;
    serve = function(options) {
        // makes it a noop in the pipeline
        return (function(files, metalsmith, done) {
            done();
        });
    };
    watch = serve; // turns watch off as well
}

// make the options for image sizes to work from
var image_sizes = [300, 400, 500, 650, 750, 1000, 1500];

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

Handlebars.registerHelper('imageurl', function(img_url, size) {
    // takes an image URL and a size and returns a properly formed url with
    // the appropriate sized version

    if (img_url !== undefined) {
        var ext = [".jpg", ".png"];
        var url = "";
        ext.forEach(function (extension) {
            var index = img_url.indexOf(extension);
            if (index >= 0) {
                url = img_url.substring(0, index) + "_" + size + extension;
            }
        });
        return (url);
    } else {
        return ("");
    }
});

Handlebars.registerHelper('moment', function(date, format) {
    // takes a date and formats it appropriately
    return Moment(date).format(format);
});

Handlebars.registerHelper('shown', function (from, to, context, options) {
    // shows items from X to Y in an array
    var item = "";
    for (var i = from, j = to; i <= j; i++) {
        item = item + options.fn(context[i]);
    }
    return item;
});

// helpers for metalsmith
var excerpt = function(options) {
    // creates excerpts from the markdown using the first para that is actually
    // a paragraph of content not an image etc.
    return (function(files, metalsmith, done) {
        for (var file in files) {
            // just look at markdown files.
            if (file.endsWith(".md")) {
                if (! files[file].excerpt) {
                    var contents = files[file].contents.toString();
                    var patt = /^\w.+?\n/m;
                    var m = patt.exec(contents);
                    if (m) {
                        files[file].autoexcerpt = removemd(m[0]);
                    }
                }
            }
        }
        done();
    });
};

var srcset = function(options) {
    // this helper looks through a markdown file, rips out any images and
    // sets them up properly to use image src sets and sizes with attribution
    // using a figure and figcaption if that's provided.
    options = options || {};
    default_size = options.default_size || 500;
    sizes_rule = options.sizes || "100vw";
    attribution = options.attribution || false;

    var filetypes = options.fileExtension || ".md";

    return (function(files, metalsmith, done) {
        for (var file in files) {
            if (file.endsWith(filetypes)) {
                // we have a markdown file
                var contents = files[file].contents.toString();
                var imgpatt = /\!\[(.+?)\]\((.*)\.(jpg|png)\)/mg;
                var urlpatt = /(.+?)\W(http\:\/\/(.*))/m
                while (m = imgpatt.exec(contents)) {
                    // find any image which is a straight markdown image in the
                    // file then replace it with the proper srcset version
                    var imgrep = "<img src=\"" + m[2] + "_" + default_size + "." + m[3] + "\" ";
                    imgrep += "title=\"" + m[1] + "\" ";
                    imgrep += "srcset=\"";
                    image_sizes.forEach(function(size) {
                        imgrep += m[2] + "_" + size + "." + m[3] + " " + size + "w, ";
                    });
                    // ensure the appropriate sizes rule is updates
                    imgrep += "\" sizes=\"" + sizes_rule + "\"";
                    imgrep += "/>";

                    // add attribition element if required
                    if (attribution) {
                        var attr = "";
                        var caption = "";
                        var url = "";

                        if (m[1].indexOf("http://") >= 0) {
                            caption = m[1].substring(0, m[1].indexOf("http://")-1);
                            url = m[1].substring(m[1].indexOf("http://"));
                        } else {
                            caption = m[1];
                        }
                        attr += "<figcaption>";
                        if (url !== "") {
                            attr += "<a href=\"" + url + "\">";
                        }
                        attr += caption;
                        if (url !== "") {
                            attr += "</a>";
                        }
                        attr += "</figcaption>";

                        imgrep = "<figure>" + imgrep + attr + "</figure>"
                    }

                    contents = contents.replace(m[0], imgrep);
                }
                // write the file contents back to the file.
                files[file].contents = new Buffer(contents);
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

var meta = function(options) {
    // adds the global meta data to each file so it can be used in the
    // handlebars context from meta.X
    return (function(files, metalsmith, done) {
        for (var file in files) {
            files[file].meta = metalsmith._metadata;
        }
        done();
    });
};

// metalsmith pipeline
Metalsmith(__dirname)
    .metadata({
        site: {
            url: "http://ajfisher.me",
        },
        imagesizes: image_sizes,
        production: prod,
    })
    .clean(false)
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
        featured: {
            sortBy: "date",
            reverse: true,
            refer: false,
        }
    }))
    .use(excerpt())
    .use(srcset({
        sizes: "(min-width: 768px) 625px, calc(100vw-6rem)",
        default_size: 650,
        attribution: true,
    }))
    .use(meta())
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
