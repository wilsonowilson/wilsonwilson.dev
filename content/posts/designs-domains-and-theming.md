---
title: '🎨 Design, Domains, and Theming'
description: 'Even though I have some design experience, I would never call myself a designer. I find UI/UX design pretty tricky, and I have great respect for people who can represent complex ideas visually.'
tags:
  - devlog
  - skrive
date: 2021-12-12
published: true
---

Even though I have _some_ design experience, I would never call myself a designer. I find UI/UX design pretty tricky, and I have great respect for people who can represent complex ideas visually while pleasing their clients.

My lack of UI/UX knowledge has made designing Skrive a bit more than a pain in the neck.

Development is faster when you already know how the finished product should look. But I find designing products _tedious_ and time-consuming.

Although I've considered hiring a designer multiple times, I want to do as much as possible by myself and spend as little money as possible. So I decided that unless I could build something _beautiful_ and usable, I'd end up getting a designer after all.

So far, Skrive's design isn't horrible, but it's still far from complete. By the time I release the app, this will have changed drastically.

![](https://skrive.s3.us-west-1.amazonaws.com/user_uploads/1639341955398Screenshot%202021-12-12%20at%2021.45.42.png)

I'm a huge fan of minimal design, so I've kept the design as simple as possible. Simple enough to keep the app from looking ugly at the very least 😅

## Custom domains

One of my goals for this week was to implement custom domains in Skrive.

At first, I had no idea how to build this. So I started by searching on StackOverflow (_of course_), and everyone kept on talking about NGINX and reverse proxy.

Being a front-end guy, I had no idea what these were. To make matters worse, a lot of the answers on SO conflicted with each other, and many people mentioned just how painful setting this up could be since I would also have to deal with SSL expirations and renewals 😱

I eventually stumbled upon [Approximated,](https://approximated.app) a rock-solid, managed solution for people like me. I managed to develop a very rough implementation of custom domains, and I now get the gist of what the technical bits like reverse proxy do and how they work.

Even though I like Approximated very much, I'm still not sure if it's a good fit for my app. If I was building anything else that needed custom domains, I don't think there could be a more straightforward solution. But I'm going to manage domains for writers who'll entrust my app with their sites' speed, reliability, and uptime, so having fine-grained control would be nice.

I recently found [Caddyserver,](https://caddyserver.com) an open-source NGINX alternative that makes working with SSL easy-peasy, and now I'm on debating whether I should maintain my custom solution.

I've decided to keep custom domains aside for now. In the meantime, I'll work on the rest of the app.

## Theming and Layouts

When I started building Skrive, I wanted to make customizability possible via layouts and color palettes. The idea wasn't inherently bad, but being constrained to a fixed number of layouts is something I didn't like.

I don't want Skrive to work with custom themes like WordPress or Blogger. Even though having the option to use one of a million themes is nice, the process of finding the perfect theme for a site can be pretty time-consuming. Customizing your picked theme to look just right is also nothing short of a pain :D

Additionally, not all themes are created equally. Some are _way_ faster than others, and others need tons of configuration to work correctly.

Just because I don't believe in colossal theme libraries doesn't mean I don't believe in customizability.

When I used WordPress, I built my sites with either of two themes, [Divi](https://www.elegantthemes.com/gallery/divi/) or [Elementor](https://elementor.com/). Both are insanely powerful website builders that can be used to design **any** basic site, the keyword being “any.”

I love the idea of having one builder for everything. That allows me to ensure performance is at its best while ensuring sites are highly customizable.

I got the inspiration for implementing this from [Carrd](https://carrd.co), a site builder whose simplicity I admire greatly.

Carrd is a WYSIWYG page builder that doesn't export sites as HTML. Instead, it exports the configuration for the site's design as JSON, perfect for my use case. Doing the same will allow my users to add components to their sites like building blocks.

## Conclusion

Admittedly, I've spent more time planning this week than actually acting. As a result, I only roughly completed the goals I set for last week, with some abandoned.

Now I have a clear plan for what I'll be doing next week, and I intend on doing my best to reach those goals so I can get people to start using my app.

- Create a minimal page/layout builder.
- Implement custom embeds and scripts on pages and posts.
- Design comment system.

Once again, I'll try my best to complete these over the next week. With the way things are going, I can expect to release early next January 🎉
