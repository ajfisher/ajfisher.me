---
author: ajfisher
date: 2015-05-04 20:00:00+11:00
layout: post.hbt
slug: pebble-controlled-leds
title: Controlling networked LEDs using a smartwatch
tags: physical computing, javascript, development, ubicomp, iot, hardware
excerpt: >
    The ESP8266 is a capable device in its own right and can run a simple web
    server. Couple this with a smartwatch for control and you have some interesting
    remote control options.
listimage: ../../img/posts/pebble_neopixel.jpg

---

The ESP8266 has definitely become the hackers darling device, albeit with a
crazy learning curve on the tool chain. Once you get over that initial curve,
however, you can do some interesting things with the device pretty quickly.

For this post, I put together a demo of some different things I had been working
on, making a strip of NeoPixel LEDs controllable via the ESP8266 using effectively
a ReSTful API. In terms of control, what better way to set your lighting mood
than to control the lights from your smartwatch - especially when you can
do it using JavaScript.

> I could build a simple web application that gets your latest train times or
Yelp reviews, but where’s the fun in that? Instead I’m going to pair a
Pebble with one of the other current darlings of the hacker community, the
ESP8266 WiFi module.

<p class="mediacontainer"><iframe title="Controlled LEDs via Pebble Smartwatch" width="560" height="315" src="https://www.youtube.com/embed/BeIQ47WBVXs" frameborder="0" allowfullscreen></iframe></p>

The full post is over at Packt:
[Using your smartwatch to control networked LEDs](https://www.packtpub.com/books/content/using-your-smart-watch-control-networked-leds)

If you want to dive into the code, [there's a gist](https://gist.github.com/ajfisher/ee6fadcd837a0f46be8d)
