---
author: ajfisher
date: 2007-11-30 13:15:00+00:00
layout: post.hbt
slug: pci-dss-will-wreak-havoc-on-smes
title: PCI DSS will wreak havoc on SMEs
tags: rant, banking, PCI DSS, security
---

One of my clients was asking me about [PCI DSS](http://www.pcisecuritystandards.org/) certification today. Coincidentally I also received our letter about compulsory compliance to the PCI DSS standard.

Both of us are what are termed "Level 4 Merchants" - that is we process less than 20,000 card transactions through the company in a year. Arguably Level 4 Merchants will probably account for the largest number of business globally as they will incorporate pretty much every SME in PCI compliant countries that takes a card as a form of payment (according to Visa about 27 million businesses).

The standard itself is a worthy document - a dozen set in stone compliancy rules to which businesses have to adhere. Most of it is common sense like settin your password on your router to something non-default, make sure card details are encrypted if they are to be stored, that sort of thing. Most businesses in the SME world would, in fact, actually be compliant - mostly because they don't store data.

Here's the rub though. Barclaycard sent both my client and I a letter basically saying you have two options on compliance: First you do it yourself or otherwise you get someone to help you (and of course they recommend a company SecurityMetrics to help you do it all - at a discounted rate of course).

Obviously the first thing I did was go to the security metrics site and request a quote. As a Level 4 Merchant it will cost me merely $699 per year to be assessed quarterly. However they can tell me do do things to get me up to spec which is then going to cost me more again. At the end of it they give me a pass or fail certification and their audit is completely subjective.

After that I went and downloaded the whole specification and read it through twice. Every point I made a note against.

Typically, this isn't a document for the feint of heart. I'm lucky first in that I'm a techie and second that I did my formative programming years in a bank specialising in what was then the forerunner of InfoSec. There is not a single line of "plain english" in the whole thing.

A couple of non-techies I've shown it to got about a page in before giving up. Your average 1-5 employee company owner doesn't have a hope. Thus he'll end up paying $699 per year for what is essentially insurance.

Even amongst Level 1 Merchants, understanding and compliance are two different things as you can see on [Evan Schuman's great article about recent stats to come out of the Level 1 camp](http://storefrontbacktalk.com/story/112907pciconfusion).

Big companies have the resources to deal with this sort of stuff and they are also more likely to be saving data on customers so for them it is crucial. Whilst no less crucial for small businesses, the fact that a store owner who only takes card payments for people when they are physically in his shop will still have to go through this audit is patently ridiculous.

BarclayCard are indemnifying themselves by playing the [FUD](http://www.google.co.uk/search?hl=en&q=define%3A+fud&meta=) card with comments like:


> To date these penalties have not been passed on to any Level 4 Merchants, but from 30th April 2008 your business will be liable for PCI DSS penalty charges and costs associated if you fail to comply or have a data compromise.

> Penalty charges can be considerable (in excess of £100,000) so, to protect your business, it is vital that your prepare for PCI DSS compliance by 30th April 2008 and continue to maintain compliance in the future.

What the PCI DSS standard fails to deal with however is systematic failure of employee behaviour. It doesn't deal with issues such as people skimming cards if they are taken out of sight nor does it deal with employees writing details down on a piece of paper and passing them on when dealing with mail order, nor does it deal with phishing scams.

Indeed I had a card machine problem last week and the support officer at BarclayCard stated:

> "Just write the details down on a piece of paper and process them later"

Hardly a piece of advice that should be followed to maintain security.

In the end businesses will have to make their own mind up about how to best deal with this new "virtual legislation" that is being thrust upon us. To me the whole thing reeks of the rise of the SEO industry piggybacking off Google's search technology.

In reality the biggest source of credit card fraud is that caused by skimming details through offline processes such as mail order (which I had done to me recently and my bank caught it on the other end within a day) or else identity theft whereby a new card is created in someone else's name.

None of the procedures outlined by the PCI DSS standard deal with these very real and growing issues - all they are doing are lining the pockets of consultant sharks that will feed on the SMEs who don't know any better and penalising the merchants for actually trying to conduct business.
