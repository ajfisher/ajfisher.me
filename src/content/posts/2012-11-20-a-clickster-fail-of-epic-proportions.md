---
author: ajfisher
date: 2012-11-20 12:10:46+00:00
layout: post.hbt
slug: a-clickster-fail-of-epic-proportions
title: The ClickFail of Australian Retail.
tags:
- cloud computing
- development
- internet
- media
- rant
- web
listimage: http://ajfisher.me/wp-content/uploads/2012/11/server-to-busy-e1353413024417.png
listimage-position: 0% 50%

---

**There but for the grace of Web Gods, go I...**

In Australia tonight we were supposed to witness the coming of age of Australian Online Retail. Our first "Cyber Tuesday" - a moment where the industry said to Australians who have been lured to the sales of the US and Europe "We can do this too". And then we didn't.

[![](http://ajfisher.me/wp-content/uploads/2012/11/server-to-busy-e1353413024417.png)](http://ajfisher.me/wp-content/uploads/2012/11/server-to-busy.png)

We didn't because technologists were too arrogant to heed the lessons of "Web Scale" development that have been done in the rest of the world. We didn't because our retail industry has spent more time crying foul over the lack of GST on international retailers than gaining proficiency in doing online commerce well. And we didn't because we still have marketers in this country who can say and hype what they want but are not held accountable to delivering good results.

I'm not happy. Not happy at all. I've spent just about my entire adult life working to stop exactly the type of problems that happened during the [Click Frenzy](http://clickfrenzy.com.au) debacle tonight.

From designing web applications that could withstand the load of half the young adult population of the UK to listen to and download the latest track featured on a Smirnoff Ice advert. To ensuring the website for the Melbourne Cup could stay up when hundreds of thousands of people all decide to find out the winner at 3:15pm on the first Tuesday of November each year. Or maybe it's just designing ecommerce applications so that when a marketing director decides on a whim to do a 40% off sale with 3 hours notice over lunch time and then email several hundred thousand customers the website will manage to survive.

For the first two hours of the 24 hour sale, <b>the website was simply unavailable due to meltdown</b>. Three hours in as I write this I can get a smattering of pages from the site but no deals to speak of.

Most of the retailers have responded admirably, turning to their social media channels to direct customers to their own websites where they could get the offers anyway. This, for me, was a highlight, showing yet again the web's ability to route around failure. Indeed many smaller brands quickly capitalised on the fiasco, launching their own deals on their sites to try and lure in customers who were eager to spend - hijacking the twitter and Facebook back-channels to their own ends.

Unfortunately, due to the huge amounts of PR in the lead up to Click Frenzy, many of our biggest retailers failed to withstand the traffic also - [Myer](http://www.myer.com.au), [David Jones](http://www.davidjones.com.au) and [Harvey Norman](http://www.harveynorman.com.au) all went down within minutes as customers started going to their sites directly. Not surprising really given these are businesses that have been dragged every inch of the way into online retail since its inception in the '90s.

Australia was late to the ecommerce party. With an industrial boom that kept customers purchasing in store at inflated rates and high shipping costs holding off international competition they had it easy until the GFC and the resources slump. Since then they have woefully mis-invested in their ecommerce platforms. They bought into the sales hype of platforms like Magento and WebSphere Commerce from consultants that have been all too eager to get reseller fees and provide little value or experience alongside it.

Most Australian retailers have shown little more than disdain for the channel. Staffing has been a nightmare - with juniors recruited because they are young, use Facebook  and "get" the Internet. Never mind that they had no experience and as a result, no ability to judge whether what their agencies or vendors were telling them was correct or a good idea.

And then there was click frenzy - an organisation that hyped its ability to drive sales for lagging retailers yet was totally unproven. An organisation who outwardly presented such a level of arrogance in the face of what they were attempting that it can only be called hubris.

This was a wasted opportunity and tomorrow, when the press releases go out, we'll see more arrogance from the team that created such a monumental disaster. Tomorrow it will be, "The scale of traffic was unprecedented , "We could NEVER have predicted this was going to happen", "This has never been done before in Australia".

Seriously STFU.

Every aspect of this endeavour could have been anticipated. A simple bit of maths by someone who understands traffic and retail customer behaviour could have told you that you'd need to do something special. The sort of special that keeps the Ticketek site running when Justin Beiber releases tickets. The sort of special that keeps the Amazon site up when they launch a new gold box. The sort of special that keeps the home page of a newspaper running in the wake of a war or global natural disaster.

Doing this maths is what keeps me awake at night leading up to big launches or events. Thankfully I've always had a stellar team around me - people like [Steve McDonald](http://github.com/stephenmcd) (Tech Lead on Melbourne Cup - now at Fairfax) and [Matt Black](http://github.com/mafrosis) (Product Lead on JBA real time behavioural processor). People I count on to think through all the problems and come up with solutions well before they are needed. People who have been there before and who are humble enough to not believe they know everything and will learn from other people's mistakes in order to prevent us making them as well.

These are solved problems. There was absolutely no reason why any of these sites needed to go down tonight. Indeed looking around others managed to stay alive - [Target](http://www.target.com.au), [Deals Direct](http://www.dealsdirect.com.au), [Kogan](http://www.kogan.com.au) were all fine.

There was no need for Click Frenzy to be running magento and the type of architecture it was running from watching it fail for a couple of hours suggested it was never going to deal with the traffic it was going to get (Magento is notorious for database overload which takes a lot to architect around). Likewise Myer, Harvey Norman and David Jones should all have good enough systems to be able to deal with these sorts of traffic spikes - what are they doing for Christmas and Boxing Day if they don't?

From my research on the effects of trust on customers' purchasing behaviour in the wake of site outages, I can tell you that all those brands who went out tonight are going to see serious lags on their sales. Forget the money spent on advertising, the ongoing loss of sales from erosion of trust (where a customer decides to go elsewhere) will hurt a lot more in the long run. The chest thumping spin that will be in the media about "we were just too popular" doesn't wash in reality with consumers - it's insulting. Every second a site is out harms your brand and you have to work extra hard to regain that trust.

That there was such a deep failure of our ecommerce systems shows that Australian Retail is not ready for a global stage.

My hope in all of this is that next week, after the dust settles, after the fingers are no longer being pointed, that learning can begin and that collectively this industry learns from the mistakes.

My fear is that it will be business as usual in Australian Retail - where this is used as yet another reason why ecommerce is not viable and investment and learning will evaporate.

**#Update: 21/11/2012 13:50 AEDT**

I mentioned in my post above that Kogan survived alongside other retailers such as Target etc. According to some people who have chatted to me, apparently Kogan did experience a small period out down time however I didn't see that as I was going back to the site every hour or so last night.

Also I just want to point out for the record, as part of this post has been used in articles on The Age and SMH, that this was not written in my capacity as CTO of JBA. JBA work with a lot of retailers around crafting better customer experiences, who fully recognise the challenges of doing ecommerce at scale, and who are working hard to try and build or refactor platforms to to deliver the type of experience that should have happened last night.
