---
author: ajfisher
comments: true
date: 2011-01-18 12:02:07+00:00
layout: post.hbt
slug: android-fragmentation-really-not-a-big-deal
title: 'Android fragmentation: really not a big deal'
small-title: true
categories:
- development
- mobile
tags: android, Apple, development, google, internet, iphone, media, mobile, phone, rant
---

This is a post I've been mulling over for a while and it now seems the right time to put my thoughts down around the issue of [Android](http://www.android.com) Fragmentation. There has [been](http://arstechnica.com/open-source/news/2010/06/ars-explains-android-fragmentation.ars) [a lot](http://news.cnet.com/8301-30685_3-20023199-264.html) [of talk](http://blog.appboy.com/2011/01/android-fragmentation-in-cold-hard-numbers/) amongst the community about this and whilst some was fuelled by [Steve Jobs](http://techcrunch.com/2010/10/18/steve-jobs-android-audio/) (though they are remaining remarkably quiet currently) it seems like the fragmentation "issue" now has a life of it's own amongst devs.

The start of the whole fragmentation debate goes back approximately a year to the end of 2009 / start of 2010. At this time Android version shares looked something like this:



	
  * Cupcake (v1.5): ~ 30%

	
  * Donut (v1.6): ~ 50%

	
  * Eclair (v2.1): ~ 20%


By the end of 2009, we had seen 3 major upgrades to the Android OS in 6 months (1.5 in April, 1.6 in September and 2.1 in October). What has been forgotten is these shares coincided with releases of new handsets (which at the time were very few). Indeed the incredible rise of Eclair in less than 3 months to 50% of global market share of Android users was largely due to the success of the [Motorola Droid](http://www.motorola.com/Consumers/US-EN/Consumer-Product-and-Services/Mobile-Phones/Motorola-DROID-US-EN) which had significant uptake. It also illustrates that the total population of Android devices was still relatively small at this point so could be easily swamped by a new device and new OS this is less the case now as can be seen by low levels of Gingerbread (v2.3) penetration.

The reality is that prior to even Froyo (v 2.2 released in May 2010), Android was an operating system in pretty small total numbers (especially compared to iOS, Symbian and Blackberry) and was still rather niche with respect to it's end user (firmly aimed at knowledgeable techies who wanted a hackable smartphone) - it was also very BETA software. At this point the Android team could afford to push a large number of OS upgrades, allowing for experimentation and feedback very quickly - they also gave themselves the opportunity to prove momentum of the operating system and to go to market with new stories, showing big improvements each time. Recall the almost slow hand clap that Apple received once it finally released Copy and Paste actions - something they could have pushed earlier were it not for their annual release cycle.

In 2010, after the release of Froyo, we see a significant slow down in version releases now the software has matured but the Android team is also bowing to pressure to do fewer releases over time because of slow carrier uptake on upgrades. This is often caused by carriers making customisations with the manufacturers and they get[ charged for doing updates](http://ausdroid.net/2011/01/17/samsung-insider-tells-the-world-how-android-updates-through-carriers-work/) as has become recently apparent.

The biggest problem the Android team had was at the point where Cupcake, Donut and Eclair were all more or less evenly split in share and there was some significant differences in the underlying APIs which could cause breakages. There were features that just weren't available in older versions of the API and it's from this root that the fragmentation issue stemmed.

Fragmentation isn't just an issue for Android developers though. As a Web Developer I've had significant fragmentation issues with browsers over the years (if you're old enough - remember going from 800x600 displays to 1024x768?). Adobe (previously Macromedia) Flash also caused significant issues when everyone wanted to use a feature of a new version (eg Video) which wasn't available in portions of the installed base and let's not even talk about the legacy of IE6.

It's not often talked about, but even iOS has fragmentation issues - most of our clients want support back to the iPhone 3G (a widely used phone due to the 2 year contracts we have in Australia) - and there were such fundamental hardware changes between versions that it still causes us issues if we need to use something like the camera (in image processing for example there's no auto focus). Almost every version of iOS requires different sizes of things like icons and this is particularly noticeable when you have to produce assets for the iPhone 4. Likewise as you move to the iPad there's a different set of capabilities (no camera for example, a lot bigger display) and I'm sure as we move to the iPad 2 there'll be a considerable number of inequalities across versions.

[These numbers](http://www.quora.com/What-proportion-of-all-iPhone-owners-use-iOS4-*-today) from the guys at Bump indicate that 10% of the population are still on iOS 3 which is not insignificant - and a lot more than 10% are using iPhone 3G and 3Gs' so there's hardware concerns as well as software ones to consider.

Just about every developer with some degree of experience has to deal with a fragmentation issue at some point. If you want to see **real** fragmentation in action, become a PC game developer for 18 months - just about every component can be changed in a PC and cause the computer to have very different capabilities and developer headaches.

We're just starting to see Android tablets (and probably phones too) with Dual Core chips in them and it's widely rumoured the A5 (the chip powering the iPad2) will be Dual Core too. What's that going to do for your fragmentation once all your code needs to be multi-threaded?

Here are some methods to deal with fragmentation:


## Stop Whinging


It's not going to change any time soon and nor do I want it to. Having a rich ecosystem of device manufacturers creates innovation that benefits consumers and creates new opportunities for developers. Do you remember what phones were like in 2006 when Nokia was the only company "innovating" due to their massive global market share? Perhaps you would prefer to go back to your Blackberry from 2007? Stop whining about how hard your life is to support all these devices - not everyone can afford your high end Galaxy S from Samsung or upgrade to the new iPhone every time Apple release one. Accept diversity and accept that not every device will be pixel perfect and move on.


## Understand your market and where it's heading


The Android team have [this page](http://developer.android.com/resources/dashboard/platform-versions.html) on their site for a reason - it's to help you understand right now and historically what sort of devices are available in the wild right now - I'd love to see Apple do the same thing to help make it easier for developers to understand the devices in the wild. Once you know your numbers you can extrapolate trends and work from there.

For example we're working on a project that might have some issues with Cupcake (~5% market share now) - we aren't supporting it for the same reasons we aren't supporting IE6. In order for us to try and achieve compatibility it would cost too much and we know Cupcake is on the way out. It's largely on phones nearly 2 years old so as people upgrade over the next 6 months it will disappear nearly altogether.


## Do you really need that API feature?


I'm a developer, I know what it's like when you get new features - it's like being an 8 year old in a candy shop with $10 in your pocket. If you know your numbers you can assess whether you absolutely need something or whether you just want it because it's shiny.


## Structure your code properly


We have an architecture called [Model View Controller (MVC)](http://en.wikipedia.org/wiki/Model%E2%80%93View%E2%80%93Controller) - you're using it right? If you don't know what it is may I suggest some further reading before embarking on phone development. MVC gives us the tools to decouple the different concers of our code (data and logic from UI and interaction). If you design your application the right way, you might need to do some UI tweaks to deal with a device with a larger screen than others - but guess what? That's all you'll change. Also your users will love you for it because the app works perfectly on their device.


## Progressive enhancement


This has been a big part of web development for some time now and in turn came from game developers. If a basic interface will do for older devices then use it then enhance the elements you want to when you know that the device has more capabilities. An example of this is GPS. On the original iPhone, GPS wasn't available - but that doesn't mean you can't do location based on cell tower triangulation or using WiFi locations to give you an estimate of where someone is. It won't tell you what street number they are standing at but it will give you suburb resolution. Build for this and then if you can get the GPS coordinates then great - you get better resolution as devices get better (especially over time).


## Do you really need an app?


This is still a [big area of debate](http://www.google.com.au/search?sourceid=chrome&ie=UTF-8&q=mobile+web+vs+native+app) but if you answer "no" to the above question, fragmentation issues within and across Operating Systems largely disappear. If you can implement what you want as a mobile website then not only will it be easier to build, it will be easier to maintain and you can support more devices in one go rather than building lots of different apps over at least two operating systems.

Similarly, a further question is "Do you need a totally native app?" Using something like [Appcelerator](http://www.appcelerator.com/) or the Open Source [PhoneGap](http://www.phonegap.com/) gives you a lot of cross-platform consistency and allows you to be a lot more efficient in app development - especially if it's something that could be created as a web app.


## Listen to your customers


Release early and release a lot of updates - with all the best testing available you're never going to simulate the mix of capabilities, OS and installed apps on someone's device. Be clear about the status of your app and allow them to feedback - thank people for their support and taking the time to file a bug report - every bug seen is a step along the way to having a fantastic, well honed product.


## Be specific about your support


Pick up any computer game and it has minimum requirements. Even Nintendo do it with different versions of the GameBoy or with requirements for Wii Motion Plus controllers. If you're doing it for a reason have some cajones and stand up for your rationale. "Sorry, this won't work on these devices because the chip isn't fast enough to play the game" works well.

If you're not going to support HTC Magics (MyTouch) - tell people. There's no point beating around the bush and then getting a bunch of bug reports you won't fix and annoy your customers which will turn into hate mail. Tell them upfront and they'll thank you for it - if they see it more often it might even spur them to upgrade to a new phone in all it's Gingerbread or Honeycomb glory. Likewise use your platform targeting in the build process so some of those Cupcake and Donut devices just don't even see your app in the Market.

Fragmentation can be an issue if you let it become one. Embrace the diversity and the challenge - remember that the apps you're building could be creating a whole new experience for someone that will change how they communicate or go about their daily life and that's an exciting place to be working - better than maintaining a 30 year old banking system huh?
