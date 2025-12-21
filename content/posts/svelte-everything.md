---
title: 'Svelte Everything'
description: "Svelte was the very first JS framework I learned how to use. In this article, I talk about why I'm using it to build Skrive despite the problems I faced with it in the past"
tags:
  - devlog
  - skrive
date: 2021-12-02
published: true
---

Svelte was the very first JS framework I learned how to use. Even though working with it was fun, I faced many issues with Sapper, and the Sveltekit was in preview at the time, so I never deployed anything with it. As a result, I've been using Vue as my primary JS framework.

When building Skrive, I tried out Svelte (this time with Sveltekit), but I quickly ran into the same issues. In fact, in my [previous article](https://devlog.skrive.space/devlog-1), I talked about how I built the app with Svelte but ported it to Vue a week later.

> In retrospect, it's clear that I faced most of these issues because I didn't spend enough time in the [Sveltekit documentation](https://kit.svelte.dev/docs) ¯\_(ツ)\_/¯

Even though I ended up rebuilding my app with Vue, the aftertaste of building with Svelte rested firmly on my tongue. I eventually rebuilt the app again with Svelte, asking questions, reading the documentation, and following best practices.

Many reasons motivate this decision, all of which I'll cover in this article. Even though I use Vue's weaknesses to highlight Svelte's strengths, this isn't a direct comparison between Svelte and Vue.

## Supercharged Productivity

It took me five days to rebuild my Svelte app with Vue. Rebuilding the Vue app with Svelte only took two **days**.

Building with Svelte is unimaginably intuitive. Handling state changes is as easy as updating a variable, and templating is just as simple. To declare a prop, you export it. Updating the `head` is just as intuitive. Binding data and elements to variables are entirely painless.

And with Vite, its speed is almost criminal…

Animating elements is also straightforward. For example, fading in an element with Svelte is as simple as writing `in:fade`. This is something I missed greatly when I worked with Vue.

Building with Svelte is… fun! I've only had this kind of dev experience with Flutter 😄

## To Type or Not to Type?

As someone from a strongly typed language (Dart), I can't do without typing when developing apps. Even with the composition API in Vue 3, working with types is still verbose.

Thankfully, Typescript in Svelte works without hiccups. All the typescript APIs I've learned work without the need for workarounds, which is pretty neat!

## Great Performance

Unlike Vue, which uses a Virtual DOM, Svelte compiles to Vanilla JS, so sites built with it are super fast even without much configuration.

With almost zero optimization, my last devlog (written and published with Skrive ❤️) got a Google PageSpeed score of 96, which is already more than performant enough to rank high on Google.

![Pagespeed metrics](https://skrive.s3.us-west-1.amazonaws.com/user_uploads/1638541107149Screenshot%202021-12-03%20at%2015.18.14.png)

## A unified component library

I had already chosen to build Skrive's reader-facing application with Svelte, so I eventually concluded it would be best to make the writer-facing app with the same framework.

Doing that allows me to reuse reader app components in the writer app. I believe this will prove even more useful when I start working on themes and previews.

## Even the nicest framework has its limits

Of course, Svelte isn't perfect. Even though I have yet to find any more severe issues after reading the documentation, I still have a couple of problems building with it.

The biggest of those problems is the small community. Compared to more prominent frameworks like React and Vue, it's almost non-existent.

The lack of a grand community implies the absence of code samples, questions on Stack Overflow, and people who can help you solve problems when you're in a pinch.

And there are almost no _good_ component libraries built with it 😭. The best thing I've found is [Daisy UI](https://daisyui.com/), but it doesn't do a great job with accessibility. With Vue, I had Headless UI, which was awesome! Unfortunately, the library hasn't supported Svelte yet, so I've had to build everything I need from scratch. That, however, wasn't too difficult.

## Conclusion

I'll continue building Skrive with Svelte. So far, both writer and reader applications are up and running. Even better, they're entirely usable now.

I'll be working on fleshing out the app from here on out. That includes

- Custom domains (with [approximated.app](https://approximated.app))
- Code injection into the site header, footer, and end and start of articles.
- Custom logos and favicons.
- A layout library (blog [minimal, classic, modern], book, catalog).

I'll be working on the above over the next week. Once I get these down, I'll start prepping to get the first alpha users on my app 🎉
