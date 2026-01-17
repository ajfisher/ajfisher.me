---
author: ajfisher
comments: true
date: 2007-10-14 07:26:00+00:00
layout: post.hbt
slug: jquery-slideshow
title: JQuery Slideshow
tags: css, javascript, development, web
excerpt: >
    A client request for a simple, maintainable slideshow led to a jQuery-based
    fade sequence instead of Flash. This walkthrough explains the setup and why
    jQuery's animation API makes the solution quick and reusable.
---

It seems JQuery is definitely gaining some traction as a useful library - not least because of the development of the [ThickBox Gallery library ](http://jquery.com/demo/thickbox/)by [Cody Lindley](http://www.codylindley.com/) which is seeing huge amounts of use around the web at the moment as a means for displaying galleries for product or photos without being constrained by the page template you are building for and by maintaining the semantic integrity of the HTML you have put into the page. The last cool feature is that you don't have to use the dreaded pop up which brings into play the whole pop-up-blocker issues.

It seems redundant to talk about the ThickBox stuff other than to say it's a great bit of kit and well worth checking out if you need gallery display functionality, I've got my own little bit of JQuery code to document here.

This came about due to a client wanting a gallery then not wanting a gallery because they didn't want to maintain all the thumbnails etc and so it evolved into a "slideshow". They didn't want to use flash due to the cost, but they were already using JQuery for other parts of their site anyway. As such I decided to have a go with building a JQuery slideshow with the animation API.

For this example I'm assuming some degree of javascript familiarity so I can get to the guts of the code.

Obviously you'll need the [JQuery library ](http://jquery.com/)- I'm using the current 1.2.1 version that is compressed so it's a light download.

Next up we need a page with an image in it with an an id called "bigimage".

We also need some javascript to set up an array with the image names in it that we want to load so let's do that:

```
var imagearray = new array("image1.jpg", "image2.jpg", image3.jpg");
```

We need to trap the moment the document becomes ready to work with so we set up the special document ready function:

```
$(document).ready(function(){
  // now we get the image and attach an onload function to it.
  $("#bigimage").css({opacity: 0});
  var theimage = document.getElementById("bigimage");
  addEvent(theimage, 'load', anim, false);
});
```

What this function does is set the opacity of the image to 0 (ie invisible) then we get a reference to it in standard javascript and finally attach an event to it which fires on the onLoad event for the image (more about this in a minute).

The addEvent function is given below and is a worker function to add an event handler for a particular object.

```
function addEvent(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);
    return r;
  } else {
    elm['on' + evType] = fn;
  }
}
```

Why do we want to add an event for the onLoad of the image? The answer to this lies in how we want to do the animation. Potentially we could have hundreds of images in an array. This slideshow fades an image in, displays it for several seconds, fades out, loads the next image and starts again.

By trapping the onLoad event of the image we can use this event to start the animation sequence which finished with an instruction to load the next image. Only once the image is fully loaded does the sequence begin again.

So our Document Ready method sets up the onLoad event handler, anim() which is listed below:

```
function anim() {
  $("#theimage")
    .animate({opacity: 1.0}, 1500)
    .animate({opacity: 1.0}, 5000)
    .animate({opacity: 0}, 1500, "linear", animNext);
}
```

This function is called every time a new image has finished loading, bringing the image from 0 opacity to 100% over a 1500 msec interval. Next it holds the opacity at 100% for 5 seconds and finally fades out over 1.5 seconds after which is calls the function animNext().

animNext is a function that deals with determining the next image in the sequence (in my case, wrapping back to the start if we get to the end) and then displaying it purely by changing bigimage's SRC property. This is pretty straightforward JavaScript so I'll leave it for the reader to do.

The key thing here is that by adding an event handler onto a low level object in the document along with a couple of animation commands a reasonable slideshow effect was created which works well for the users and was good for the client as it is maintainable and didn't cost a huge sum as it would have done in flash.

It's the ability of JQuery to expose enough variety of basic features to allow you to do this very quickly and easily. I have no doubt that after 10 years of writing javascript that I'd be able to do this all by hand. The questions are "Do I want to?" and "Is it good value for the client if I do?" - my answer to both of these is "not on your nelly".
