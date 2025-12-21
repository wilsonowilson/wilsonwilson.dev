---
title: Everything you need to know about Web Renderers in Flutter
date: 2021-04-20 
tags:
  - flutter
  - web
published: true
image: https://res.cloudinary.com/wilson-wilson/image/upload/v1622568898/featured/flutter-web-renderers_zdifvc.jpg
description: Html and Canvaskit. What's the difference? This article will help you identify what renderer you should use and why.
---

I've been building web apps with Flutter for almost a year now. Throughout my journey, I've come to learn that building a *stable* web app with the Framework is not as straightforward as it may initially seem.

You see, there are many *little* details and configurations that affect how an app built with Flutter will look and perform... some of which **can** make or break it. One example is the web renderer you decide to use.

## What the Heck are Web Renderers?

As the name implies, these are used to well, render a Flutter app on the web.

Flutter gives you two options... The **html** renderer, and **canvaskit**.

This article will help explain what makes the two of these renderers so different, when to use each one and the problems that they currently have.

Because both of the renderers have problems, I will also cover what these problems mean for your projects, so that you can make the right choice.

## The Battle of the Renderers

Getting Flutter to run on the web was not straightforward. Unlike Flutter for iOS, Android, and Desktop, the web *did not have access to the underlying engine.


![Flutter mobile architecture](https://res.cloudinary.com/wilson-wilson/image/upload/v1622570175/articles/flutter-web-renderers/flutter-mobile-architecture_pfqpko.png)

The solution to this problem was to replace this Engine with an implementation of `dart:ui`. How the implementation would be carried out was where the complexity lay.

The first solution was to use HTML, CSS and the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) on web, which is how we got the **html renderer**.

The second solution *which came later* was to bring Skia to the web via [**CanvasKit**](https://skia.org/docs/user/modules/canvaskit/) and Web Assembly. Unlike the html renderer, this doesn't depend on html or css, making it "independent" of the browser's rendering technique.

> To get a deeper understanding of how these renderers work, as well as how and why they came into existence, I recommend you read this article about the [Introduction of Flutter to the Web](https://medium.com/flutter/hummingbird-building-flutter-for-the-web-e687c2a023a8), and optionally the [Web Support Update](https://medium.com/flutter/flutter-web-support-updates-8b14bfe6a908). They are both fantastic reads.

### Advantages and Disadvantages

Both the html renderer and canvaskit have great advantages over each other. Unfortunately, their disadvantages are just as great as their advantages.

#### The HTML Renderer

- Has a smaller bundle size than Canvaskit and therefore, loads faster.
- Uses native text rendering, allowing for use of system fonts in a Flutter application (More about this later).

##### Disadvantages

- Fidelity issues with text layout.
- Less performant than canvaskit.
- Problematic SVG support*
- Not all methods in the canvas api work properly.

Text layout was one of the biggest issues the Flutter team faced when porting Flutter to web, and it is still an issue.

Admittedly, you will most likely have no problem if you are building an application with a lot of text, but if your application is text heavy, it would not be out of the ordinary to find a random issue with text positioning or layout (That sometimes, has never been seen before 😱).

About SVGs, Flutter web already supports them. All you need to do is pass them to an Image widget instead of using `flutter_svg`. But this can become problematic when building cross platform applications and can feel "hacky" because you have to swap widgets depending on the platform.

```dart
class AdaptiveSvg {
  ...
  final String asset;
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return Image.asset(
        asset,
        ...
      );
    } else {
      return SvgPicture.asset(
        asset,
        ...
      );
    }
  }
}
```

Not all methods in the canvas api work properly on Flutter web. For example, [canvas.saveLayer is broken](https://github.com/flutter/flutter/issues/48417). This is the reason why [blending widgets](/articles/css-style-blending-using-flutter) using the technique I wrote about doesn't work on html.

#### Canvaskit

- Blazing fast and extremely performant 🔥
- Accurate text measurement and layout
- Behaves pretty much the same as Flutter for mobile/desktop (All paint methods are supported and SVGs work as normal).

##### Disadvantages

- Does not use native text rendering. Therefore, custom fonts have to be shipped along with it.
- Emoji Preloading Issues. Because of the point above, a custom font for emojis has to be preloaded into your app when it is first loaded. The font (Noto Color Emoji) is also quite large (9mb at the time of writing).
- Larger bundle size. The renderer is about [2mb larger](https://flutter.dev/docs/development/tools/web-renderers) than the html renderer.
- CORS issues

One of my biggest problems with canvaskit is the emoji support. Downloading a 9mb font at runtime is *far* from ideal. And there have also been cases where [using a lot of emojis ruin performance](https://github.com/flutter/flutter/issues/79882).

<embed-tweet id="1379121093093511171" ></embed-tweet>

## What This Means for your Web App

Before you pick a web renderer for your Flutter app, consider the following.

### Loading Time

I don't have strong opinions about the loading time for Flutter web apps. After all, if you are using Flutter to build a web app, loading time should obviously not be a priority.

And of course, loading times can be improved with [tree shaking and deferred loading](https://medium.com/flutter/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674).

But in general, if you want faster loading times, especially on mobile, go with the html renderer.

### Data Usage

Canvaskit's bundle size is large than html's.

If you're going to use emojis in your app, you'd definitely not want the user to download a large font in addition to your app.

So if you're concerned about data consumption, stick with html.

### Text Fidelity

If your app has a lot of text (ex a note-taking app or journal), canvaskit is the better option. You wouldn't want to stumble upon a random text measurement bug related to html.

> If you notice any issues with Flutter's text measurement, create an issue in the [Flutter Repository](https://github.com/flutter/flutter).

If however you'll be dealing with a lot of emojis, you might be safer with html, at least for now.

### Performance and Uniformity

If you're app requires high performance, or relies on the canvas APIs available on only canvaskit (for example, a graphic design tool), then canvaskit should be the obvious choice.

Most of the time however, you may not need the performance canvaskit offers, and it may be worth trading extra performance for faster loading times and a smaller bundle size.

## Why Flutter Has Two Different Web Renderers

Because canvaskit is more precise, performant and is relatively more stable than the html renderer, some might ask why html is still being maintained and improved.

In my opinion, it is a wise choice to maintain both of them, because they both have their use cases.

A minimal site most likely would be better off without the larger bundle size and compatibility issues that canvaskit brings. Html should do the job just fine.

In other words, if you know what you're doing, **you'd appreciate the fact that you get to make a choice**.
