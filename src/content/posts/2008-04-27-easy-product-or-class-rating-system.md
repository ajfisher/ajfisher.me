---
author: ajfisher
comments: true
date: 2008-04-27 18:02:00+00:00
layout: post.hbt
slug: easy-product-or-class-rating-system
title: Easy product or class rating system
wordpress_id: 38
categories:
- fuzzy logic
- internet
- web
tags:
- data
- database
- optimisation
- scripting
---

So you've got a lovely little ratings system going on your site. All of a sudden though you get slashdotted, dugg or just your marketing starts working and you have thousands of users all rating your products / services / systems / posts / videos etc and your pages start to creak.

"It's the shared web space you're on," say your techies, "it can't handle the users" and duly bounce you to a better hosting environment at triple the cost along with the migration charges.

From time to time I come across this problem when I've either picked up code from someone else or else a techie asks me how to optimise a page that's running really slowly. In this particular instance it was caused by a ratings system in the style of [Amazon](http://www.amazon.com/) or [YouTube](http://www.youtube.com/) - basically a user is displayed a product and then people rate it as to whether it's any good. The real problem came when they had a list of products, each of which had it's individual ratings displayed.

The cause of this very slow page however had nothing to do with shared hosting or otherwise or direct server load - it was all down to some naive coding executing what my old CS lecturer would call an O(n)2 process.

What the coder had done was get a list of products, then for each product gone back to the database and got a list of all the rankings ever made and then averaged them out. Nice and simple but frightfully inefficient and that which caused the problem I've highlighted.

This isn't the first time I've seen this and I've been asked how to build them numerous times as well so here's a well optimised method of doing it in general terms.

Consider first that calculating the average when you insert into the database is going to be computationally less expensive than calculating it every time you perform a select when a user hits the page. This sounds obvious but it's stunning how often it's overlooked.

Make two extra fields for your product table, one called average and the other called user_count or something. On your insert of the rating into the ratings table, run a trigger or else add some code that will update the product table with the updated count and a new average calculated from the ratings info.

Now when you select the product data you pull down the average and user count as part of that select and they are just simple static fields, thus adding no more computational load than the original select or view does already.

This gives you a nice little rating system that's not heavy in terms of processor load. However we can improve things once step further if you aren't interested in the data.

The option I'm providing below is good if you are just after a running average and don't care about the individual ratings being kept. I did a project recently where we weren't worried about keeping individual ratings data because the site wasn't going to be up for very long and it didn't add anything to our system to have it.

This option uses a running weighted average in order to just update the data in the product table without requiring a ratings table at all.

Some useful background maths though:

If I have a set {3, 4, 4} and take it's average I need to add the numbers and divide by the number of entries. Thus this set's average is (3+4+4)/3 = 3.67

Now suppose I've precalculated this average as I've suggested above and stored it without the individual ratings, I now want to add another rating, 2 to the set.

Intuition says to do something like this: (2 + 3.67)/2 = 2.83 which is actually wrong. Looking at the set {3, 4, 4, 2} we can guestimate that the average is going to be somewhere more between 3 and 4 than it is 2 and 3 as we've calculated above.

Thankfully a technique from statistics gives us an option here which is to use a weighted average instead. This is useful for adding sets together that have different numbers of elements within them but maintain the averages by skewing the data using proportional averages (or a weighted average).

The general formula for this is:

Avgw = (Avg1 * (n1 / (n1+n2))) + (Avg2 * (n2/ (n1+n2)))

Where:

Avg1 is the average of the first set
Avg2 is the average of the second set
n1 is the number of elements in the first set
n2 is the number of elements in the second set

In our example this simplifies even further because our second set is actuall only one item. So let's work this through:

Avgw = (3.67 * (3/(3+1))) + (2 * (1/(3+1)))

= (3.67 * 3/4) + (2 * 1/4)

= 2.75 + 0.5

= 3.25

Which is the answer we're after for our average.

As we know all the base line average data in the product table and we know the value of the rating we're tracking, it's a very simple function to update this instead of doing another insert into a ratings table and we just keep on doing it for every rating that has been added.

Computationally this is a very inexpensive process and whilst I'm more than happy to be shown otherwise I think this is about as good as it gets in terms of optimisation.

The key thing is we've now reduced an O(n)2 operation to O(n) which is a drastic improvement as n tends towards infinity.
