---
title: Everything I Learned My First Week Building in Public
description: I started building in public seven days ago, and in that short time, I've achieved and learned so much. In this article, I break down everything I did and learned.
tags:
   - devlog
   - skrive
date: 2022-01-09
published: true
---

Today marks day seven since I started building my next SaaS application *Senja* in public 🥳

It's only been seven days, yet, I've learned and achieved much, much more than I had expected.

In this article, I'll share everything I did, learned, and achieved by building in public throughout this week.

## Building an Audience With Twitter

I joined Twitter on December 30th last year and only started actively using it on January 2nd when I started building in public.

Since then, I've gained 70 followers! It's not that much, but it's honest work 😅

I have no idea what I'm doing, but I think I understand the basics of making tweets that drive engagement.

Here's everything I've taken away from being on Twitter within these seven days.

### Talking in First Person is All I've Got.

When I joined Twitter, I started by giving advice and posting threads. Unfortunately, I got near zero engagement doing this.

![One of my first tweets](https://res.cloudinary.com/euboid/image/upload/c_scale,w_949/v1641738428/blog/Tweet_by_euboid_idcicw.jpg)

Even though I've been blogging for years, I don't have the following nor the reputation to back up my claims, so these tweets performed poorly.

The threads I posted unsurprisingly have the lowest engagement among my tweets.

![A poorly performing thread](https://res.cloudinary.com/euboid/image/upload/c_scale,w_907/v1641738583/blog/Tweet_by_euboid_2_hwuslo.jpg)

I guess that threads perform better as you grow. Having more followers to retweet your content will undoubtedly lead to more eyes on your Tweets.

I officially started building in public on January 2nd, and once I posted about it, things started looking up.

![First build-in-public tweet](https://res.cloudinary.com/euboid/image/upload/c_scale,q_auto:good,w_940/v1641738843/blog/Tweet_by_euboid_3_k7z3zl.jpg)

Even though the engagement wasn't incredible, I started getting followers steadily.

Every time I posted about building in public, I got more followers. At this point, it started to click that **giving advice/opinions was the wrong approach to take**.

Just talking about myself and what I'm learning has worked great so far.

The posts that usually brought me the most followers were about my progress indie-hacking, and my most engaged post is about one of the mistakes I made building in public.

![Tweet about mistake building in public](https://res.cloudinary.com/euboid/image/upload/c_scale,q_auto:good,w_924/v1641739101/blog/Tweet_by_euboid_5_zfqbdi.png)

Since taking a me-first approach, my tweets and engagement have improved considerably.

### Analytics and experimenting are essential.

I love using data to optimizing for growth. I'm one of those people who constantly refreshes analytics dashboards 😅

The only reason why I've been able to start making tweets that work so early on is that I've been actively monitoring stats from day one.

I use [Blackmagic](https://blackmagic.so/pricing/?code=EUBOID_ABECF1FE) to get analytics at a glance and to understand and visualize how my tweets perform. It's been an invaluable tool so far.

Since I'm optimizing for followers, clicks to my profile and retweets have been my most valuable metric. By monitoring my best-performing tweets in this regard, I've created tweets that drive more follows.

I've also tried my best to experiment with different formats. Some have poorly performed so far, while others have exceeded my expectations.

I'm tracking all I learn with [Blackmagic](https://blackmagic.so/pricing/?code=EUBOID_ABECF1FE) and [Typefully](https://typefully.app/?via=euboid), then adjusting accordingly.

### Hashtags are extremely valuable at the beginning.

All my best-performing tweets have hashtags in them. I think it makes sense because I have almost no way of reaching people due to how small my account is.

Tweets can only do well if they're engaged with a lot (liked, retweeted, commented on, etc.). Without a following, I have almost no one who'd do this for me at the start and serve as a catalyst.

The tweets I post without hashtags or links are only liked by my followers, while tweets with hashtags meet more new people.

### You need to talk to people!

A lot of people don't find me via my tweets. Instead, they see me via my responses to other people's tweets.

> Replying to people's posts and sharing value isn't just a great way to make friends and build relationships. It's also a great way to gain handfuls of followers, which is incredibly important in these early stages.

You might have heard this advice before. After all, many people say that replying to larger accounts and providing value is a great way to grow on Twitter. However, few people talk about how to provide value through your responses.

Not all tweets demand replies. But, most of the time, there's no way you can force yourself to reply without making a half-assed comment. Replying to tweets was something I struggled with in the beginning.

I follow a list of people building in public. The accounts in this list are much bigger than mine. Now and then, I look for Tweets I can reply to. I focus more on Tweets that ask questions because **those Tweets demand value directly**.

I've had great results replying to these question-based Tweets (i.e., Tweets that demand responses). Doing this has helped me steadily gain followers.

---

These have been the most significant takeaways from my progress on Twitter in the last week.

## Building my application

There's not much to say here 😅. When I started building, I set a goal to complete a rough, backend-less prototype. I, however, failed colossally, primarily due to my lack of clarity about what I was building in the beginning.

### The Name and Purpose

The first two days of the year went to planning and, of course, naming. I spent over 8 hours searching and finally settled with Senja!

Senja comes from the polish word "recenzja," which means "a review," "critique," or "notice." The word aligns perfectly with what I'm building at the moment.

In a nutshell, Senja is a tool I'm building that helps businesses collect rich, social feedback *on autopilot* as audio, video, and text, then share them in high-converting formats.

Once I figured out the name, I got to work.

### My Stack

I'm only building the frontend now, so I'll focus on that in this article.

I'm using Svelte + Sveltekit as my JS framework. Even though Vue and React are more popular, IMHO, Svelte is easier and more fun to work than the two. I talked more about why I use Svelte to build my projects in my article, [Svelte Everything](/articles/svelte-everything).

As for styling, I'm using Tailwind CSS. [Tailwind helps me build beautiful applications as fast as I can design them](/articles/how-i-build-mvps-quickly).

Even though [my last application failed](/articles/how-i-validated-my-idea-with-reddit), it helped me sharpen my understanding of these tools, and now building with them makes me extremely productive.

### Completed the authentication flows

Whenever I build a new application, I start with the authentication pages (I don't do this for any specific reason; it just helps me figure out the app's aesthetic).

I completed the auth pages for Senja on the first day of building in public, and I'm pretty happy with how they look.

![Senja signup page](https://res.cloudinary.com/euboid/image/upload/c_scale,q_100,w_940/v1641746896/blog/Screenshot_2022-01-09_at_17.48.00_jhwoi0.jpg)

I'm going for a minimalist yet bold look for Senja (something like what Sketch is doing). 


### Quit building the dashboard

Like I mentioned [in a previous tweet](https://twitter.com/euboid/status/1479553292082589702?s=20), I wasted 3 days of my week building the dashboard of my app.

Building the dashboard first was definitely the wrong approach because at the time, I was still unclear about all the features Senja would have.

So I spent the rest of the week building the review collection pages, and became productive once again.

Even though I wasn't able to achieve this particular goal, I'm sure I'll do better next week.

---

That's pretty much everything I learned and did this week! My goals for next week are simple.

- Complete the UI for the feedback collection pages, the dashboard, and the edit pages.
- Get 120 followers on Twitter.
- 10+ email list subscribers
- Start Building the Landing Page (I definitely won't be able to do everything, but I'd like to at least start this one)
- Start building my backend infrastructure.

I'll continue talking about what I learn here on my blog. If you'd like to follow my progress, subscribe to my newsletter, or [follow me on Twitter](https://twitter.com/euboid).