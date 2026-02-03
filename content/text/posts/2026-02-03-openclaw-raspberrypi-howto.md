---
title: >
    No Mac Mini, no worries: running OpenClaw on a Raspberry Pi.
slug: openclaw-raspberrypi-howto
author: ajfisher
date: 2026-02-03 21:16:00+11:00
layout: post
excerpt: >
    OpenClaw gives us a taste of a personal AI assistant that can actually do
    things, but you don't need to buy an expensive Mac Mini or give full access
    to your digital life for it to be useful. This guide walks through running
    OpenClaw on an inexpensive Raspberry Pi for long-lived research tasks.
twitter_excerpt: >
    A practical guide to running OpenClaw on a Raspberry Pi — without
    hype, without over-permissioning, and without buying new hardware.
    Focused on research, agent orchestration, and real-world use.
    #ai #agents #openclaw #raspberrypi
listimage: ../../img/posts/rpi-on-desk.png
imageby: ajfisher - gemini / nanobanana
featureimage: ../../img/posts/rpi-desk-camera.png
tags: ai, development, agents
---

The last week or so, the developer / tech world has been going a little wild
for ~~Clawdbot~~ ~~Moltbot~~ [OpenClaw](https://openclaw.ai) as the first real
instance of a personal agent that can actually *do* things for you. That is,
so long as you run it on your machine and give it more or less unfettered access
to all of your stuff [with all the attendant security concerns this
brings](https://www.theregister.com/2026/01/27/clawdbot_moltbot_security_concerns/).
Fever pitch was reached going into the weekend and people were going out to
buy brand new Mac minis to run it. Spoiler - you don’t need a Mac mini to run
OpenClaw.

You can do this with much more modest hardware as I've done.

Personally, I wouldn’t say I’ve bought into the hype entirely. I’m
definitely running it in a much more secure setup - primarily as a research
assistant - rather than an agent that is doing my email and scheduling meetings.
I know everyone loves [Claude](https://claude.ai) and
[Codex](https://openai.com), but Copilot and Gemini are more than capable of
some scheduling or email summaries and drafts, so I just let them do their
thing without feeling the need to Claude-ify my entire life.

One of my biggest pain points is I often want to run research spikes on code,
model or architectural approaches that need to run on a more “real” environment
than what can be achieved in a Codex or Claude web instance. Essentially,
mirroring the set up when you’re using the agent locally on your dev machine.

Currently, this means sending a message from my phone to brief the tool, then
reviewing and iterating before eventually pulling it down to a machine to run
more usefully before pushing to github or incorporating into something else
etc. Sometimes if it’s just code change it can push to github and other
automations take over but most of my work is research so I’m not really making
commits as product features.

I thought running OpenClaw would be a good way to do this as I get the power
Codex, Claude or Gemini coding agents working locally coupled to something that
is long lived, can have access to other resources and I can chat with over my
phone in an interactive manner.

Looking under the hood at what OpenClaw is actually doing (basically just an
agent running in a loop with persistent memory calling APIs), I was absolutely
certain this could be achieved on a modest Raspberry Pi 5 with 8GB of RAM.
That’s also something I happen to have many of laying about for various
projects.

So that provides context about what my scope was and why I made this choice,
the details below provide instructions about how you too can get OpenClaw
running on a simple Raspberry Pi.

## Device specs

This was just a raspberry PI I had laying around, but I’m lucky enough to have
a lot of these and some additional elements that make this better than a Pi out
of the box. But you can do this with a 4GB+ RPi4+ and an SD card if you just
want to play.

Base items needed:

- Raspberry Pi 5, 8GB RAM
- SD card (64GB+ though you could probably go smaller)
- Raspberry Pi (or similar rated) power supply
- Wifi / wired network connection
- Discord, Telegram or other chat account you can have admin access to

Optionally (and what I used):

- 500GB NVMe M2 SSD for performance as the primary drive.
- Raspberry Pi camera module (x2 so it can “see” my studio)

## Bake the Pi

Install the base OS [according to the official
instructions](https://www.raspberrypi.com/documentation/computers/getting-started.html).
I used the 64 bit Lite version of Trixie as I wasn’t going to attach a screen
so didn’t need a desktop. If you’re remotely comfortable with a command line
then go for the light version as it runs a lot faster.

On first run, update all of the installed packages `sudo apt-get update && sudo
apt-get upgrade` to ensure everything is ready to go.

Also run `raspi-config` and go through the various menus and configure locale,
timezone, network etc as required.

In order to keep this brief, I won’t outline the process of installing onto an
SSD.

## Install the basics

The following I consider the basics of most raspberry pi set ups. You can
always add more later as you need it but I’d consider these the minimal extra
set of packages needed beyond the base install.

```sh

# some basics for file manipulation, build processes, version control etc
sudo apt install -y git jq ripgrep curl wget build-essential

# vim in place so you have a decent editor. Emacs if you prefer that.
sudo apt-get install -y vim

# add github and ffmpeg as you'll likely want those to interact
# with repos and streams
sudo apt-get install -y gh ffmpeg

# add chromium so you have a browser your agent can use headlessly
sudo apt-get install -y chromium

# switch to zsh to mirror Mac (optional)
sudo apt install zsh -y
# change default shell
chsh -s $(which zsh)

# get Node22 and install it globally
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y

# make a global npm directory that your user can have access
# to rather than in /lib where the default is.
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# update path to ensure you can install and run npm modules from CLI
echo "export PATH=$HOME/.npm-global/bin:$PATH" >> ~/.zshrc

# logout and log back in again and then follow config
# set up for zsh around your preferences.

# check path is okay and has your .npm-global folder on it
echo $PATH

# now install oh my zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# set up docker
sh -c "$(curl -fsSL https://get.docker.com)"
```

## AI agent setup

If you’ve already got access to some coding agents, get them enabled on the Pi
so you can use them rather than set up new API keys.

### Setting up access to Codex

The easiest way to do this is with a device code for codex. Before you can do
that though, you need to enable it in your [security settings in your OpenAI
account](https://chatgpt.com/#settings/Security). Select “security” and then
enable the device code auth for Codex.

```sh

# assuming a folder you can write to
npm install -g @openai/codex

# start codex
codex

# choose authentication method
# Device Code is most straightforward
# Use an API key if that's your preference instead
```

You’ll be presented with an authentication link to follow so sign into OpenAI
like you do usually. Then you’ll be asked if you want to trust the device. Copy
the device key from the TUI and then that will sign you in on the raspberry pi.

Test out a question to make sure it’s all working okay.

### Setting up access to Gemini CLI

This is pretty straightforward but you’re best off doing this over an SSH
connection as the CLI will give you a URL to follow and you want to do that on
a browser you control, can sign into Google with and do the authorisation flow.

```sh
# asssuming a folder you can write to
npm install -g @google/gemini-cli

# start gemini
gemini

# You'll be prompted with an auth method. If you have a google account then use
# this option and you'll be presented with the auth URL.
# follow this to complete the sign in and auth steps.

```

This will then create application auth tokens on the raspberry pi that will
allow you to access gemini using your Pro / Ultra account and make that
available to openclaw.

Test out a question to make sure it’s all working okay.

### Other LLMs

If you want to configure other tools like claude code etc you can do the same
thing here as well following the same patterns above.

### Set up Ollama

We can use small models via [Ollama](https://ollama.com) for really lightweight
things locally that don’t require going off to ChatGPT or Gemini or similar.
Be realistic with your expectations here - this is for orchestration and light
tooling, not local inference. For simple things it works well but keep it small.

```sh
# get ollama itself all set up
curl -fsSL https://ollama.com/install.sh | sh

# Add models that are useful in this context
# simple but capable models for text
ollama run qwen3:1.7b
ollama run gemma3:1b

# small vision model
ollama run qwen3-vl:2b
```

Note that the vision model is quite good but with larger images it will
struggle. So make them smaller first then throw the image at the model to
interpret.

## Set up OpenClaw

This is remarkably simple:

```sh
# download open claw and run set up bootstrap
curl -fsSL https://openclaw.bot/install.sh | bash
```

This will install the npm package in your global context that we set up earlier
and do things like set up the systemd service etc so it can all be restarted
pretty easily and the service will start up on reboot.

Once you do that you’ll be launched straight into the onboarding process. To a
large extent just take the defaults when they are presented. If you previously
set up a coding agent then OpenClaw will detect this and use those same creds
as the primary model for the agent.

Your newly hatched assistant will get a bit of a vibe check from you in terms
of how you want it to behave. At this point the personality signals aren’t
super strong so pick what you fancy but recognise you’re mostly talking to the
Gemini, Codex or Claud personalities with a bit of flavour here and there.

Config is relatively straightforward so you can always come back to this as the
CLI is well set up for making edits.

You can always drop back into the config on the command line:

```sh
openclaw configure
```

The command line tools are very well set up and easily navigable via a TUI so I
would generally recommend working with them that way. The web interface is
genuinely rough at the moment and isn’t clear what you’re editing - just avoid
it and use the CLI.

## Things to set up immediately

### Mobile comms

Firstly, get some kind of off device communications channel set up as soon as
possible. This is a huge unlock for your usage. Use something you can access
from your phone: slack, discord, telegram, teams etc. I set up a specific
discord server, went [through the config for adding the
bot](https://docs.openclaw.ai/channels/discord) and added it to the relevant
channels in about 15 minutes. Once you’ve done this you’ll now be able to chat
off your phone and have it work on things remotely.

If you do this as a first step, you may not ever need to set up things like a
VPN or other type of access. You and your assistant communicate via an
intermediate server. You get the benefit of mobility, and it stays inside your
personal network relatively safe from prying behaviour.

### Get web search and browsing working

By default the assistant can just use curl off the command line and then read
through the results.

If you installed chromium in the install process then tell your assistant it’s
available and to use it headlessly. Doing this will allow it to execute JS,
render pages etc. Installing something like
[playwright](https://www.npmjs.com/package/playwright) gives it the ability to
interact with the page and orchestrate it. Great if you want it to fill out a
form for you (eg an on-site search box or postcode checker).

Being able to search more generally requires a couple of extra steps. Go to the
[Brave search service](https://brave.com/search/api/) and then sign up for an
account. Once you’ve done that you can set up a new API key but you have to
select a plan. The [free plan is very
good](https://api-dashboard.search.brave.com/app/plans) if you’re not getting
your assistant to go wild on the searches for you. There is a menu for this in
`openclaw configure` under web tools and Brave Search where you can add the API
key.

Just tell your assistant that they can only do one search per second and they
will automatically limit their behaviour.

### Your assistant’s “brain” is just markdown

Have a poke through its core files and read them to understand what is going
on. These are largely located in `~/.openclaw/workspace/...` and hold
everything from memory files to instructions for tool use, information about
you, it’s personality etc.

OpenClaw works on the basis that most calls are occurring independently so
writing stuff down is the only way to ensure some degree of persistence. As
such, you’ll have access to these as well so you can edit the files to tune up
things like personality, correct information etc.

### Get some sort of backup happening

I actually asked my assistant to just set this up and it wrote a quick rsync
script with some zipping. Perfectly fine for a bunch of text files and what
not. It just applies that weekly and it added it to a cron task to execute and
validate.

You can go as hard as you like on this but start with simple tools and expand
outwards as you need to.

### Create a documentation process

I ended up using a very simple notion process for this in
[Notion](https://notion.so). I created a new top level page in my notion space
called `assistant` then created a [new
integration](https://developers.notion.com/guides/get-started/create-a-notion-integration)
with read and write access to just that page and generated an API key.

At that point, I installed a [notion
skill](https://www.clawhub.ai/steipete/notion) that can use the API key
provided and told my assistant about it. They confirmed they could read and
write to the space and then set up some scaffolding in it for us to use.

We have a “reading” database where I can snip URLs into it and a few times a
day the assistant will check to see if it’s got anything unread and then go
away, read them and can use that to ask me follow up questions etc.

There is also a `projects` folder which has a list of stuff we’re working on
and we use this for project documentation, planning etc before getting stuck
into the process. This is perfect for when I’m on my phone and want to brief
something and we can iterate it together as they can edit it as well.

You could do this with google docs, obsidian or some other shareable web based
documentation.

### Get memory search working

This isn’t enabled by default and you can use OpenAI embeddings if you have a
specific OpenAI key enabled. I tried this and got some conflicts with my codex
set up so abandoned it. Instead I used the local memory search embeddings which
runs a small embedding model locally to create the data. This is well and truly
fast enough on a Pi to run and it works reliably.

## Thoughts after time working with OpenClaw

After working with OpenClaw extensively for the last week, I’d make these
observations about how to work with it effectively:

- Just like regular coding agents, [skills](https://www.clawhub.ai/), MCP
  servers and APIs are a big unlock to provide access to other tools. If there
  are things you know about, direct it towards them as “safe bets” but it can
  also search for things via the bundled `clawhub` cli tools.
- Steer your assistant to build tools that can result in deterministic
  outcomes. Rather than oneshotting stuff, encourage it to write a script that
  it can validate the outputs of and then wrap that in a skill and remember it.
- The system is self evolving. Particularly how I’ve set it up, this assistant
  doesn’t have access to anything that is truly damaging either for itself or
  for me. As such you can say things like, “hey change your config to do …” and
  it will go away and do it. This, coupled with being able build itself tools
  gives a very dynamic vibe where the assistant feels like it’s learning and
  getting more capable.
- I sent the assistant a voice note, forgetting it didn’t know how to handle it
  and with one quick follow up message via text, it grabbed
  [Whisper](https://github.com/ggml-org/whisper.cpp), wrapped a script around
  it then made a tool and established how it was going to use it (in the space
  of me doing self checkout at the supermarket). Later I sent a link to a
  podcast, and without telling it, it worked out that because it wasn’t from me
  it would transcribe it and give me the results.
- Lots of channels can make your assistant a little forgetful. I originally set
  up multiple channels to partition conversations. That’s fine for me but in
  the backend it’s mashing all of the information together anyway into markdown
  files. So I’ve pulled back on this a little now.
- Maybe avoid [moltbook](https://moltbook.com) - or give your assistant
  permission to read specific submolts (eg
  [m/todayilearned](https://www.moltbook.com/m/todayilearned), m/agenttips, or
  m/moltoverflow) to pull out useful information. Just like coaching a teenager
  and social media, point out the conspiracy, crypto and wild shit and provide
  some direction as to how to engage with it. [It’s getting wild in
  there.](https://www.astralcodexten.com/p/best-of-moltbook)
- Definitely encourage your assistant to “write it down”. We will use things
  like discord etc to help with our memory, unless you explicitly tell it to
  search discord for a post and then use that for something else, each message
  is sort of new. If you encourage the assistant to write things down then it’s
  far more likely to remember things.
- Typically, it’s bad at coming back to you if it’s been beavering away on
  things. I haven’t quite fixed this yet, but normally a message saying, “hey
  how did you go with X” will be enough to get it to give you a summary. I’ve
  also started saying, “set a task to give me an update on the status of X at
  3pm”. These work but are a little frustrating but I’m sure improvements will
  come as people use this a lot more.

## Is it worth installing?

Unequivocally yes. This is especially if you have the technical ability to set
this up as securely as you can and you have the interest. 2025 was the year
where we transitioned from LLMs being useful to Coding Agents being useful. At
the start of 2026 we’re now entering a period where Agent Orchestration becomes
useful.

I don’t think you need to give an assistant full access to your entire digital
life to be helpful - in fact I think that is probably counter productive. If I
want to talk crap with my mates over whatsapp, I shouldn’t need an assistant to
do that and it takes the fun out of my life - why bother?

In a world where you can build just about anything digital quickly, and
increasingly cheaply, using an agent orchestration assistant already starts to
feel like a very natural way to work. There are many times I need something
just “good enough” to work or to try a dozen variations of an idea - and my
time at a keyboard is the key limit on this.

So yes, install OpenClaw. Don’t put it on your daily computer, don’t give it
access to all your sensitive information but do give it agency to do things and
potentially trash the system it lives in - you might be surprised at the things
it suggests and does.
