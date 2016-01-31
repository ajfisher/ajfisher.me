---
author: ajfisher
date: 2007-12-10 17:45:00+00:00
layout: post.hbt
slug: net-xslt-and-how-to-import-an-external-xml-document
title: .NET / XSLT and how to import an external XML document
tags: development, web
---

I work with XML and XSLT every day of the week. Indeed working for a company called [XML Infinity ](http://www.xmlinfinity.com/)you can imagine how much we use it. I had one of those incredibly frustrating moments this afternoon that one typically when dealing with badly documented parts of .NET or XSLT.

The annoyance in question was to do with loading a document in to an XSL template on the fly. 99.9% of the time you don't bother with this as you have a master XML document which you transform according to the XSL template that is assigned to it. All your XML processing is usually done before you get to this point.

There is an xsl function though called document() which you can use to load in an external XML doc to the XSL template and then do work on it. I've used this before but the damn thing wouldn't work. Why not? Because our Transformation Engine wasn't using a loose enough resolver to be able to deal with externally referenced files... grrr. I know why MS did this because it's so the parsing engine doesn't go loading every document under the sun and potentially crashing.

That's great but they could have documented it a bit better.

The resolution by the way is to create an XmlUrlResolver, give it some credentials (in my case setting it to DefaultCredentials which allows you to access http::, file:: and https:: protocols) and then pass that into your Transform() method.

Job done.

Not quite.

Having finally been given access to an external XML document I then had to contend with XSL's arcane methods of dealing with XML fragments. Again documentation was the issue here.

Looking online there are some ridiculously complex ways of parsing an external document when by rights it should be as simple as just dropping the doc in a variable and then processing according to the variable. People were using recursive templates using xsl:copy and all kinds of things.

Turns out the way to do it is a little known second parameter.

If you do this:

```xsl
<xsl:variable name="var1" select="document('http://example.com/file.xml')"/>
```

All you'll end up with is the text nodes. Not very useful.

If you do this, however (note the second parameter):

```xsl
<xsl:variable name="var1" select="document('http://example.com/file.xml', /)"/>
```

You'll end up with a full fledged XML document complete with nodes and everything put into your $var1 variable and you can then use it to select data according to standard XPATH constructs.

If you don't want the whole document you can pass the second argument as an XPATH query and it will just return that nodeset - much easier to deal with.

In all the time I've been dealing with XML / XSL I didn't know about this and it was a great pain to figure out. Typically the only reason I was doing this was to mock something up for a client quickly and it then turned into a mammoth effort. Knowing now though will save time subsequently I guess...
