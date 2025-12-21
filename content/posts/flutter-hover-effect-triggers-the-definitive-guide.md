---
title: Flutter Hover Effects - The Definitive Guide.
date: 2020-12-11
tags:
  - design
  - flutter
published: true
image: https://res.cloudinary.com/wilson-wilson/image/upload/v1622568898/featured/Hover-Effects_q726ii.jpg
description: This article will show you how you can create stunning hover effects for Flutter Web and Desktop using InkWells and MouseRegions.
---

I've been sharing a few [hover effects built using Flutter](https://github.com/wilsonowilson/Flutter-Hover-Effects) on Twitter over the last few days. Quite a few people said they would like to know how they work, so I decided to write a quick article explaining just that.

<embed-tweet id="1335959173377429504" ></embed-tweet>

Some of them may look complex, but under the hood, they all work the same way. In fact, they're not as special as they may seem.

The secret sauce lies not in the animations, but in how the mouse is used to animate the widgets. This article will discuss just that.

## Detecting the mouse

As far as I know, there are two widgets of varying complexity, which can be used to detect a mouse hovering over the UI. The `InkWell` and the `MouseRegion`. These two widgets provide everything you need to create any hover effect you need to create Flutter hover effects.

Let's start with the `InkWell`. The `InkWell` comes with a handy callback called `onHover` which will be triggered whenever the mouse hovers above its child. This callback provides a boolean, which tells us whether it is being hovered over or not.

Take the following example:

![flutter hover effects hello world.](https://res.cloudinary.com/wilson-wilson/image/upload/v1622570438/articles/flutter-hover-effects/Screenshot-2020-12-11-at-14.49.45_bxeiba.png)

```dart
@override
   Widget build(BuildContext context) {
     return Scaffold(
       backgroundColor: Colors.cyan.shade50,
       body: Center(
         child: InkWell(
           onTap: () => null,
           onHover: (hovering) {
             print(hovering);
           },
           child: const Text(
             'Hello, world',
             style: TextStyle(fontSize: 30),
           ),
         ),
       ),
     );
   }
```

In this example, whenever the mouse hovers over the Text, "Hello World", `true` will be printed to the console, and when it leaves, it prints `false`.

Using this, we can tell our UI whether the mouse is hovering or not. Using this mix, combined with implicit animations, we are instantly granted access to an infinite amount of possibilities.

![Hover button in flutter](https://res.cloudinary.com/wilson-wilson/image/upload/v1622570440/articles/flutter-hover-effects/ezgif-4-52605cac9fe3_hxia8z.gif)

**Behold! The hover button.**

```dart
bool isHovering = false;
 ...

InkWell(
        onTap: () => null,
        onHover: (hovering) {
          setState(() => isHovering = hovering);
       },
       child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.ease,
          padding: EdgeInsets.all(isHovering ? 45 : 30),
       decoration: BoxDecoration(
            color: isHovering ? Colors.indigoAccent : Colors.green,
            borderRadius: BorderRadius.circular(15),
          ),
       child: const Text(
            'Hello, world',
            style: TextStyle(fontSize: 90, color: Colors.white),
         ),
       ),
      ),
```

> Warning! This InkWell will not detect hover events if the onTap property or similar is null.

You can also use these triggers for explicit animations. All you need is an `AnimationController`. If the mouse is hovering, move the animation forward, and if it's not, reverse.

That is exactly how my [City Cards demo](https://github.com/wilsonowilson/Flutter-Hover-Effects/tree/master/lib/demos/1-City-Cards) works:

```dart
  onHover: (e) {
    if (e)
      controller.forward();
    else
      controller.reverse();
   },
```

<iframe class="w-full aspect-video my-6 rounded-lg" src="https://www.youtube.com/embed/ZCdpVqwUNo4" frameborder="0" allowfullscreen></iframe>

## Using the mouse position

For most use cases, the `InkWell` may be all you need to create any Hover Effect. But what if you wanted to know where the mouse is on the screen? Or where the mouse is relative to a widget.

Enter the `MouseRegion`. The `MouseRegion` is like an `InkWell` on steroids (in the context of hovering at least). It does not only tell you if the mouse is hovering or not. It can also tell you when it enters, or exits. It can give you the mouse's position on the screen (position), as well as its position relative to its child (localPosition).

Let's take two examples that will show you how it can be used.

### The Pointer

I babbled a lot about pointers in [this article](https://wilsonwilson.dev/css-style-blending-using-flutter/), but I never really talked about how to actually create a custom cursor.

To make it, wrap your widgets in a MouseRegion. This MouseRegion will update a variable offset with every new pointer event.

```dart
class _MyAppState extends State {
  Offset offset = Offset(0, 0);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MouseRegion(
        onHover: (e) => setState(() => offset = e.position),
	     ....
```

Now we can use that offset to translate a pointer in a `Stack`.

```dart
Scaffold(
      backgroundColor: Colors.cyan.shade50,
      body: Stack(
       children: [
         Center(
            child: const Text(
              'Hello, world',
              style: TextStyle(
               fontSize: 90,
              ),
            ),
         ),
         // This is the key! We translate a black dot based on the offset.
         // The reason why we subtract an Offset of x & y as 10 is because
         // we want to position the dot in the center.
         Transform.translate(
           offset: offset - Offset(10,10),
           child: Container(
               width: 20,
               height: 20,
               decoration: BoxDecoration(
                  color: Colors.black,
                  shape: BoxShape.circle,
               )),
          ),
            ],
          ),
        ),
```

The full code should look like this:

```dart
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State {
  Offset offset = Offset(0, 0);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MouseRegion(
        onHover: (e) => setState(() => offset = e.position),
        child: Scaffold(
          backgroundColor: Colors.cyan.shade50,
          body: Stack(
            children: [
              Center(
                child: const Text(
                  'Hello, world',
                  style: TextStyle(
                    fontSize: 90,
                  ),
                ),
              ),
              Transform.translate(
                offset: offset - Offset(10,10),
                child: Container(
                    width: 20,
                    height: 20,
                    decoration: BoxDecoration(
                      color: Colors.black,
                      shape: BoxShape.circle,
                    )),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

![Pointer animation flutter hover effect](https://res.cloudinary.com/wilson-wilson/image/upload/v1622570439/articles/flutter-hover-effects/ezgif-7-664d695df03d_qqkdm1.gif)

Simple pointer

There are many things you can do to make the animation look even better.

For example, you can use the `AnimatedPositioned` widget to make it animate smoothly, as well as delay the animation, as seen in [this demo](https://github.com/wilsonowilson/Flutter-Hover-Effects/tree/master/lib/demos/4-Cursor-Blending):

<iframe class="w-full aspect-video my-6 rounded-lg" src="https://www.youtube.com/embed/dR3C0QUbeZY" frameborder="0" allowfullscreen></iframe>

Check out the [code](https://github.com/wilsonowilson/Flutter-Hover-Effects/tree/master/lib/demos/4-Cursor-Blending)!

> Side Note: If you want to learn how to blend widgets as seen in the above video, check out [this article](https://wilsonwilson.dev/css-style-blending-using-flutter/).

BONUS TIP! If you would like to hide the cursor, the MouseRegion comes with a `cursor` property (`InkWell` has `mouseCursor`). Just pass in `SystemMouseCursors.none`. Check out the other [`SystemMouseCursors`](https://api.flutter.dev/flutter/rendering/SystemMouseCursors-class.html) for more custom cursors.

### Getting relative mouse positions

By relative mouse position, I mean a value extrapolated by comparing the mouse position to the size of its bounds. Let's say our screen was 1000 pixels wide. Using the middle as a reference point, 0 pixels (beginning) would be represented as -1 and 1000 pixels (end) would be represented by 1, while the center would be represented by 0. Let's call that value our `relativeDx`.

![Relative mouse positions for hover effects.](https://res.cloudinary.com/wilson-wilson/image/upload/v1622570439/articles/flutter-hover-effects/Relative-Position_vzpetf.jpg)

You may wonder why the heck you would need this.

I've found this approach especially useful when building parallax animations. To get our desired rotation/skew, all we need to is multiply our offset by the reference value (`relativeDx`). Take this example:

```dart
 Transform.translate(
      offset: Offset(
          100 * relativeDx,
	  0,
        ),
        child: Container(
           height: 400,
           color: Colors.blue,
        ),
    ),
```

When our `relativeDx` is 0 (the mouse is in the middle), the container will not rotate at all. When it's at -1 it will rotate towards the left, and when it's at 1 it will rotate towards the right.

Let's say we wanted to take our screen width as a reference point. Given that our mouse position on the horizontal is mousePositionDx, take a look at this snippet.

```dart
final screenWidth = MediaQuery.of(context).size.width;
final referenceWidth = screenWidth / 2; // Where we want to be zero
final newRelativeDx = -(referenceWidth - mousePositionDx) / referenceWidth;
```

This will yield -1 when the mouse is at the beginning of the screen and 1 when it is at the end.

The same can be applied to get the relative vertical position.

I use this technique in [this demo](https://github.com/wilsonowilson/Flutter-Hover-Effects/tree/master/lib/demos/2-Perspective-Cards):

<iframe class="w-full aspect-video my-6 rounded-lg" src="https://www.youtube.com/embed/oel55zq8FVg" frameborder="0" allowfullscreen></iframe>

For more examples of hover effects, check out my [hover effect gallery](https://github.com/wilsonowilson/Flutter-Hover-Effects) on Github.
