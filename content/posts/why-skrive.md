---
title: 'Why Skrive'
description: 'Today marks day nine since I started building Skrive, an app built to help writers, creators, and publishers get their content out as fast as possible. In this post, I talk about what it is and my motivation behind it.'
tags:
  - devlog
  - skrive
date: 2021-11-25
published: true
---

Today marks day nine since I started building Skrive, an app built to help writers, creators, and publishers get their content out as fast as possible.

I've been able to go from idea to demo in a pretty short time, and now that editing with my app is possible, I decided to write and publish a quick _devlog_ with my app.

## The problem

**I love writing**. Nowadays, I write about all sorts of things, from software development to language learning and personal development.

I also love sharing my writing via blogging. I've been blogging for four years on many different platforms, from Blogger and Medium to WordPress and Ghost. I have also built countless blogs for other people, mainly using WordPress and code.

Because of how many blogs I've set up, I'm well aware of the pains that come with building blogs and publishing content.

If you search on Google for "how to start a blog", you'll get at least fifty posts in a row from authors recommending WordPress (mainly because they're affiliated with hosting companies 😤).

WordPress is mighty, but I've never liked it for many reasons. Besides security issues and _[shudder…]_ plugins, WordPress is a pain in the butt to set up.

You have to pay for hosting, a domain, and an SSL certificate just to get started. Then, you have to find and purchase a good theme and a bunch of plugins for basic functionality.

Then you start working with page builders, spam filtering, and SEO to get your writing published.

As someone who wants to publish my writing and share it with others, that's a crap-ton of work.

Plus, it's expensive. Just basic hosting can cost anywhere between $30 and $70 for a year. A good theme costs anywhere between $20 and $80! And plugins are also pretty pricy. A plugin to make your site load decently like WPRocket will set you back another $30.

And this is all **for one site**. If you wanted to create a different blog for some other topic, you'd end up spending this amount again.

This is just too much for a person who wants to write, even as a hobby. And setting all this up takes way too long.

### Trying out other blogging platforms.

WordPress is just one of the many platforms you can use to publish your content. Simpler blogging platforms like Blogger, Write.as, and Medium make it easier to do this. But they, too, suffer from many issues.

Blogger is simple and works great for the average hobbyist, but most sites built with it look outdated and are hard to customize. And adding custom integrations for services like email marketing can be a pain to set up.

Write.as is probably the best example of a site that focuses on publishing your content than building the site. But it's too simple and lacks many essential features like comments, and the editor isn't powerful enough for most creators.

Medium is also great for quick publishing, but you don't "own" your content. You can't set up a custom domain, or distinguish your blog from the rest of the Medium catalog.

## Write first, build later.

I believe that publishing your content shouldn't involve days or weeks of setup… that you should be able to start writing and publishing from day one, with near-zero configuration or effort required.

If you need new features, like comments or email marketing, you should add them like building blocks.

Skrive is the materialization of my beliefs.

The name Skrive is the Danish word for the action, "writing," which is precisely what Skrive will allow you to do effortlessly.

Skrive allows you to publish your content to your personal space that looks and works great from the get-go so that you can spend more time writing and less time building.

You can organize articles or posts in Skrive under "folders" called "spaces." These spaces represent actual sites that people can visit and interact with.

You also have the freedom to post content without spaces, allowing you to publish and share them individually.

## How I'm building it

There's still a ton left to do. I've been focusing primarily on the editing experience for the past few days, and I plan to do so for a few more days.

Skrive's editor is built on top of CKEditor5, which allows you to write **rich content** with zero hassle. It enables you to embed images, code, tables, media, and even raw HTML in your posts. It also has markdown support 🎉

I initially built the Skrive editor with Svelte and Sveltekit (which are promising). However, I ran into so many random issues, and the community is still pretty small, so I ported the app to Vue 3 + Vite over the last three days. I'd probably build the reader-facing app with Svelte because of its performance and how nice the syntax is.

As for the backend, I'm using a Postgres database + Hasura on Heroku and Firebase for authentication + functions. This stack has worked incredibly well so far.

## What I've built so far and what's next

At the moment, the editor works excellently but isn't that fleshed out. Individual publishing and publishing under spaces also work great, and all embeds are fully functional!

I'm yet to build the reader-facing app, which is arguably more critical than the editor-facing app, but I'm still pondering what theming, and customization options would be best for the app.

The domain skrive.com was already taken but isn't being used, so I settled for a much more stylish domain, "skrive.ink", and all blogs will be hosted under "skrive.space" which seems pretty fitting.

## Conclusion

I'll continue writing about my progress here on Skrive. If you liked this and would like to use Skrive as soon as it comes out, send an email to [hello@wilsonwilson.dev](mailto:hello@wilsonwilson.dev) 😄
