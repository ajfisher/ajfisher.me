---
author: ajfisher
date: 2007-11-21 09:14:00+00:00
layout: post.hbt
slug: why-was-data-being-passed-on-a-disc-and-what-was-eds-advice
title: Why was data being passed on a disc and what was EDS' advice?
tags: rant, data, privacy, government
---

Readers in the UK will be aware of a Data Protection Act train crash that we have been watching unfold in front of us over the last few days. It turns out that 25 million records of a database managed by [HMRC](http://www.hmrc.gov.uk/) have been lost in the post because they were sent on a couple of disks using unrecorded mail.

There has been much speculation about which minister to blame and who in the cabinet (including the Prime Minister) should lose their job but one thing that is mostly missing is the notion of data security.

In the UK we have the Data Protection Act - policies enshrined in law to which I am constantly referring when talking to my clients. A typical day for me usually includes quoting something from the DPA at least once. Not least because a client wants to harvest user data and use it for something else that is outside the bounds of what is technically legal.

I've done a lot of work for government and I have to say in my experience they have terrible technical practices. Gone are the days of locked down machines with no floppy drives and only CD-Rs. In are mass market units from Dell with the latest in CD/DVD-RW (because they are cheap and mass produced) along with USB connectors that people can hot plug a pen drive into and download whatever they like. The current government has a woeful record on technology projects mostly because they don't understand it and they contract suppliers who talk a good presentation rather than deliver an effective solution.

According to the DPA

>"Appropriate technical and organisational measures shall be taken against unauthorised or unlawful processing of personal data and against accidental loss or destruction of, or damage to, personal data."

This is why our PM said procedures weren't followed and he is bang on the money there. This relaxed attitude to data, particularly sensitive data, has been demonstrated in this debacle. If the data was going to be put on disc why wasn't it fully encrypted?

Indeed, why wasn't there a secure online facility for user data to be interrogated without recourse to physical copies to begin with?

In addition the data was supposed to have been "desensitised" before sending - a quaint term meaning removal of things like bank details, exact personal date and full address information. To do this EDS wanted to charge money for it. The department didn't want to pay so they took the lot.

EDS are complicit in this as much as the people from HMRC are. How hard is it to type into the database "Select name, age, postcode from person where...." instead of "Select * from person where..." Or else just remove the columns that were sensitive on output. It would have taken me a few minutes so it can't have taken an experienced EDS engineer that long.

EDS shouldn't have been charging for that sort of difference - but it sounds more complex so it was an opportunity to get some more cash in - probably.

Further EDS should have been saying "We advise you that the data you are requesting is excessive for the purposes of what you are going to use it for so we'll give you a more secure subset". That would have rammed home the implications of what the staff at HMRC were asking for.

In my history of working with government I have come across this sort of situation many times before. It is well known that government contractors over charge, shaking the fruit out of the infinitely laden money tree whenever they can. Our E-Minister is supposed to deal with this sort of thing but in practice he's a politician who knows as much about IT as my mum. The only way to resolve this problem is for wholesale changes to occur within government (locking down machines) and to make stiffer penalties the punishment for breaches of the DPA.

We now have a situation where 25 million adults in the UK are worried that their personal details are going to be used in some sort of mass identity fraud.

My view is pragmatic in that the CDs are propably laying in the corner of a sorting office at TNT somewhere - but they could well be in some gangster's tech lab being processed and that is the point of all this security.
