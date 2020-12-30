---
author: ajfisher
date: 2014-05-04 18:30:00+11:00
layout: post.hbt
slug: device-api-safari
title: A Device API safari
large-title: true
tags: development, web, API, standards, mobile, presentation
excerpt: >
    There are many interesting things to be found in the Device API. This
    talk went on a journey to see what we could find worth playing with.
featureimage: jungle.jpg
imageby: Miwok
imagelink: https://www.flickr.com/photos/miwok/8665323395/
listimage: posts/jungle.jpg

---

The Device API allows browsers to have more access to the underlying hardware
on the host machine and allows it to appear more "native". Mostly this has been
aimed at mobile devices and incorporates the very well known Orientation and
Motion APIs. There are, however, a great many other Device APIs available,
some of which are well supported and some that are only new.

This was a talk presented at [Web Directions Code 2014](http://www.webdirections.org/code14/)
and explored numerous facets of the Device API, including:

* Sensor APIs
* Web NFC
* Network APIs
* Proximity
* Battery Status
* Vibration
* Ambient light

The presentation is embedded below:

<p class="mediacontainer"><iframe title="A device API safari" src="//www.slideshare.net/slideshow/embed_code/key/BGkZl6CDNLabUl" allowfullscreen frameborder="0"></iframe></p>

[A Device API Safari - WDC 2014](//www.slideshare.net/andrewjfisher/a-device-api-safari-web-directions-code-2014)

The main aim of this talk was to have a large number of demos in the 20 minute
presentation in order to show case what was possible. All the code for these
demos is [available in the repo.](http://github.com/ajfisher/wdc)

The demos are embedded below if you'd like to play with them in more detail noting
that support can be a bit hit and miss. Firefox is pretty much guaranteed.

## Proximity

Support: all mobile devices with a proximity sensor

<p class="mediacontainer"><iframe title="Proximity sensor test" src="http://wdc14.ajf.io/examples/proximity/" frameborder="0"></iframe></p>

[Proximity detection](http://wdc14.ajf.io/examples/proximity/)

<p class="mediacontainer"><iframe title="Video of proximity test" src="https://www.youtube.com/embed/7cgug03jmVw" frameborder="0" allowfullscreen></iframe></p>

## Battery

Support: All modern browsers except IE (any)

<p class="mediacontainer"><iframe title="Battery API example" src="http://wdc14.ajf.io/examples/battery/demo.html" frameborder="0"></iframe></p>

[Battery level](http://wdc14.ajf.io/examples/battery/demo.html)

## Vibration

Support: Most devices that have vibration motor in them

Application in HTML games:

<p class="mediacontainer"><iframe title="Vibration motor example" src="https://www.youtube.com/embed/0AC_InC0QMA" frameborder="0" allowfullscreen></iframe></p>

[Racer](http://wdc14.ajf.io/examples/racing_car/)

Application in form error reporting:

<p class="mediacontainer"><iframe title="Vibrating form example" src="http://wdc14.ajf.io/examples/vibrate/form.html" frameborder="0"></iframe></p>

[Vibration form](http://wdc14.ajf.io/examples/vibrate/form.html)

## Ambient light

Support: Firefox on desktop and most mobile devices

Application in contrast modification:

<p class="mediacontainer"><iframe title="Ambient light contrast changer" src="http://wdc14.ajf.io/examples/ambient/contrast.html" frameborder="0"></iframe></p>

[Ambient light for contrast modification](http://wdc14.ajf.io/examples/ambient/contrast.html)

Application in silliness:

<p class="mediacontainer"><iframe title="Video showing ambient light changes" src="https://www.youtube.com/embed/E2Eu5gRvkME" frameborder="0" allowfullscreen></iframe></p>

<p class="mediacontainer"><iframe title="Ambient light demo" src="http://wdc14.ajf.io/examples/ambient/ghosts.html" frameborder="0"></iframe></p>

[Ghosts appearing over video stream](http://wdc14.ajf.io/examples/ambient/ghosts.html)

