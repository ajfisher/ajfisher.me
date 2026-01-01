---
author: ajfisher
date: 2007-11-26 13:53:00+00:00
layout: post.hbt
slug: adding-cron-jobs-to-a-qnap-server
title: Adding Cron Jobs to a QNAP server
tags: development, linux, devops
---

If you haven't come across them yet[ QNAP](http://www.qnap.co.uk/) make these amazing little NAS boxes that are perfect for home or SME use. I've got mine running as a home server but might get one for the office as our old server is on it's last legs and a fully tricked out 1U dell server is a bit of overkill for a glorified file server.

The best thing about these devices though it that they run Linux OS utilising [Debian](http://www.debian.org/) Essential and as such they can be configured to do almost anything you want. Out of the box they already come with file serving, media serving, database and web servers.

One slight problem though is that the boot up process is not disimilar to that of a live CD. This is great in that it makes the system highly robust and it boots to a known state each time. The problem is that short of rewriting the firmware you can't introduce things into the boot process. What I don't want to do is have to re-run a load of scripts to configure the server how I want it after a power failure or forced reboot.

The boys over on the [QNAP forums](http://forum.qnap.com/) are really on the case and one of the chaps has created a nice little framework script which hooks into the boot process and allows the execution of a series of scripts. [You can see his work here](http://www.qnap.box.cx/).

After installing this workaround you can add scripts to the scripts folder and take control of your server.

One of the things I wanted to do was add items to my cron list and this process is explained below.

1. SSH into your QNAP box

2. Install the custom scripts files at [http://www.qnap.box.cx/](http://www.qnap.box.cx/) as per the directions there.

3. CD to your scripts directory in custom and make a file called joblist.txt in VI (Vi is the only editor you have on the QNAP drive).

```sh
> vi joblist.txt
```

When in vi make your list of cron jobs using the [standard CRON syntax](http://www.adminschoice.com/docs/crontab.htm).

Mine was the following:

```
25 1 * * * /share/backup/script.sh
```

This will run a backup script I had written at 1:25am everyday. You can add as many or as few as you want. Save your document and exit from Vi.

4. Make your script that will fire on start up. I called mine cron_update.sh

```sh
> vi cron_update.sh
```

In there put the following code:

```sh
#!/bin/sh
# this script apprends a job list to the existing crontab
echo "Reconfigure CRON list:"
cronpath=/share/MD0_DATA/custom/scripts
#list the cron tab and put in a temp file
crontab -l > $cronpath/cron_jobs.txt
#append the items we want to the master cron jobs list
cat $cronpath/joblist.txt >> $cronpath/cron_jobs.txt
# replace the existing crontab with the new one
crontab $cronpath/cron_jobs.txt
```

Save and quite out of Vi.

You'll notice I've used a variable in here to specify where to find the files. This is because the autorunmaster script is a folder higher so we need to be explicit about where to find things.

5. Go back up a directory to your custom folder. In there edit your autorunmaster.sh file with vi.

```sh
> vi autorunmaster.sh
```

At the end of the file append:

```sh
/share/MD0_data/custom/scripts/cron_update.sh
```

Then save and close the file.

Now when you reboot you should have your newly added cron jobs appended to the crontab without removing all the old ones.
