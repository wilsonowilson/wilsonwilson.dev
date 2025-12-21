---
title: Custom Paint 101. The Ultimate Guide to the Canvas.
date: 2021-06-28
tags: 
  - design
  - flutter
  - dart
published: false
description: Working with the canvas can feel complicated and frustrating. This article explores the features of CustomPaint, CustomPainter, and the Canvas and hopefully helps you to work more comfortably with it.
---

The canvas is probably one of the essential components of the Flutter framework, the reason being that at a low level, most widgets you can see and interact with use it to display their content. 

Unfortunately, it's also one of the most daunting parts of the framework, scaring many adventurous newcomers.

If you've struggled to understand how the canvas works and you don't know what to do with the plethora of methods that the canvas exposes, this article should be of great help.

This article should serve as a rich, visual guide that familiarizes you with the canvas methods and as a reference that you can return to when you get stuck or forget how something works.

## CustomPainter & CustomPaint

This section discusses how to set up a descendant of the `CustomPainter` class and work with the `CustomPainter` widget.

Creating a `CustomPainter` is quite simple. Just create a new class that extends `CustomPainter` and implement the `paint` and `shouldRepaint` method.

```dart
class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {}

  @override
  bool shouldRepaint(MyPainter oldDelegate) {
    return true;
  }
}
```

The `paint` method contains all our "painting" code. In addition, it provides us with a `Canvas` and the `size` of the parent. 

Here we use the canvas to draw to the screen just as we would do on an actual canvas, in the sense that each operation is conducted sequentially, or one after the other.

The `shouldRepaint` method lets Flutter know when to repaint this widget. If MyPainter had variables passed into it, for example, a color, this would come in handy.

```dart
class MyPainter extends CustomPainter {
  const MyPainter({required this.color});

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {}

  @override
  bool shouldRepaint(MyPainter oldDelegate) {
    return color != oldDelegate.color;
  }
}
```

In the above example, we tell Flutter that the widget should be repainted only when the color of the `oldDelegate` is not equal to the current color.

For now, we return true when `shouldRepaint` gets called.

Now that we've set up our `CustomPainter`, we need to place it somewhere in the widget tree. Flutter provides a `CustomPaint` widget just for this.

We'll start by setting up a `MaterialApp` and adding a home page with a `Scaffold`. In the center of this `Scaffold`, we place a `Container` with a fixed width and height of 300 pixels and a background color of indigo.

As its child, we create a `CustomPaint` widget, and we'll finally pass our `painter` (`MyPainter`) in.

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Introduction to Custom Paint',
      theme: ThemeData.dark(),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          width: 300,
          height: 300,
          color: Colors.indigoAccent,
          child: CustomPaint(
            painter: MyPainter(),
          ),
        ),
      ),
    );
  }
}
```

At this point, you should see an indigo square in the center of your screen.

![A Container in the center of the screen with invisible CustomPaint child](https://res.cloudinary.com/wilson-wilson/image/upload/v1624831511/articles/flutter-custom-paint-and-canvas/Screenshot_2021-06-27_at_23.05.02_ljnfzl.png)

Of course, we can't see any content painted to the screen by `CustomPaint` yet, because our paint method doesn't have any content! So we are going to change that pretty soon. But before we continue, let's talk about sizing.

### How CustomPaint Sizes its Painter

Unless we provide `CustomPaint` with a child, we must explicitly state the size of the painter by its parent. What does this mean?

In the paint method of `MyPainter`, try printing out the size.

```dart
class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    print(size);
  }
  ...
}
```

At the moment, you should see `Size(300.0, 300.0)` printed on the console.

But what if you gave the `Container` no size?

```dart
...
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          color: Colors.indigoAccent,
          child: CustomPaint(
            painter: MyPainter(),
          ),
        ),
      ),
    );
  }
...
```

The console prints ` size (0.0, 0.0)`, and the screen stays blank because `CustomPaint` depends on the size of the parent. If, however, we were to give `CustomPaint` a child with a fixed size, let's say, a `SizedBox` with a width and height of 200, we'd see `Size(200.0, 200.0)` printed to the console.

``` dart
...
	@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.indigoAccent,
        child: CustomPaint(
          painter: MyPainter(),
          child: const SizedBox(
            width: 200,
            height: 200,
          ),
        ),
      ),
    );
  }
...
```

Another important thing to note is that even though the CustomPaint has a size, the painter can paint outside the given size. 

Going back to our initial `CustomPaint` setup with an indigo 300x300 `Container`, we can remove the `Container` 's color and draw some paint in the `paint` method of `MyPainter` (Don't worry too much about `canvas.drawPaint` for now).

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          width: 300,
          height: 300,
          child: CustomPaint(
            painter: MyPainter(),
          ),
        ),
      ),
    );
  }
}

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    canvas.drawPaint(Paint()..color = Colors.indigoAccent);
  }

  @override
  bool shouldRepaint(MyPainter oldDelegate) {
    return true;
  }
}
```

Indigo should now be covering your entire screen! 

![CustomPaint covers the screen in indigo even though a size has been set](https://res.cloudinary.com/wilson-wilson/image/upload/v1624832679/articles/flutter-custom-paint-and-canvas/Screenshot_2021-06-27_at_23.24.30_l08icb.png)

This might surprise you. After all, we've already set the width and height to 300 pixels. So why does the paint cover the entire screen?

This happens because `CustomPaint` doesn't clip what's drawn by the painter. So you are free to draw outside the bounds of your canvas. To fix this, you can always wrap your painter with a `ClipRect`. 

```dart
	@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          width: 300,
          height: 300,
          child: ClipRect(
            child: CustomPaint(
              painter: MyPainter(),
            ),
          ),
        ),
      ),
    );
  }
```

Now you should have a centered indigo square just like before!

### Let's talk about coordinates 

The flutter canvas uses a cartesian coordinate system to draw content to the screen.

By giving the container a Size of 300x300, we gave our canvas a Size of 300x300. So the coordinates we use when drawing start from **0** on the x and y-axis and go all the way to **300**.

The coordinates are relative to the parent and not to the screen, so since our Rectangle is in the center of the screen, (0, 0) represents the Rectangle's top-left corner.

![Cartesian coordinate representation on purple canvas with positive and negative marked](https://res.cloudinary.com/wilson-wilson/image/upload/v1624876268/articles/flutter-custom-paint-and-canvas/Illustration_1-2_uwau7e.jpg)

Assuming our painter's size matched that of the screen, the starting point would represent the top left corner of the screen, and the ending point would match the bottom right corner of the screen.

## Drawing to the Canvas

The canvas exposes 21 methods that you can use to draw all sorts of shapes and elements to the screen. This guide covers 16 of the most valuable methods. At this point, we can clear all coloring and clipping done in the previous examples.

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          width: 300,
          height: 300,
          child: CustomPaint(
            painter: MyPainter(),
          ),
        ),
      ),
    );
  }
}

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {}

  @override
  bool shouldRepaint(MyPainter oldDelegate) {
    return true;
  }
}
```

### Canvas.drawCircle

The first thing we'll look at is drawing a circle to the canvas. 

`Canvas.drawCircle` draws a circle at a given offset. Take a look at the following example:

```dart
@override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();
    paint.color = Colors.indigoAccent;

    final center = Offset(size.width / 2, size.height / 2);

    const radius = 64.0;

		canvas.drawCircle(center, radius, paint);
  }
```

First, we instantiate a `Paint` and give it a color of indigo. The coordinates for the center of the canvas are just half of the width and height. Then we give our circle a radius of 64 pixels.

This draws a 128x128 circle in the center of the canvas.

![Centered indigo circle drawn by Canvas.drawCircle](https://res.cloudinary.com/wilson-wilson/image/upload/v1624877661/articles/flutter-custom-paint-and-canvas/Screenshot_2021-06-28_at_11.54.16_yxbedm.png)

The offset provided represents the center of the circle. So assuming you used `Offset.zero` for the center, the circle, would be drawn at the top left of the canvas.

### Canvas.drawRect

Drawing a rectangle is a bit more complicated than drawing a circle. The complication lies in specifying the size and position of the Rectangle. However, once you get used to it, it's becomes super easy.

To draw a rectangle, you need a `Rect` and a `Paint`. In the following example, I draw a square that takes up the width and height of the canvas.

```dart
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();
    paint.color = Colors.greenAccent;

    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), paint);
  }

```

![Centered, green square drawn by CustomPainter](https://res.cloudinary.com/wilson-wilson/image/upload/v1624878218/articles/flutter-custom-paint-and-canvas/Screenshot_2021-06-28_at_12.03.33_zhmye4.png)

Let's take a look at precisely what `Rect` is and how to use it.

#### Getting a Rect

Dart provides many ways to specify the size and position of a rectangle. Let's take a look at a few.

##### From Left, Top, Width, Height

To specify the size and position of the green square above, we use `Rect.fromLTWH` (meaning `Rect` from left, top, width, height).

```dart
Rect.fromLTWH(0, 0, size.width, size.height);
```

In this example, the Rectangle is placed 0 pixels from the left, 0 pixels from the top and has a width and height matching the screen. 

This approach should be familiar to you if you've used [`p5.js`](https://p5js.org).

##### From Left, Top, Right, Bottom

Just like `Rect.fromLTWH`, we position the Rectangle from the left and top. But this time, we explicitly state the coordinates where we want the `Rect` to end.

```dart
Rect.fromLTRB(50, 60, 120, 120);
```

This example creates a rectangle, 50 pixels from the left, 60 pixels from the top, and 120 pixels to the right and bottom.

Therefore, the `Rect`'s total width is R-L (70), and the height is B-T (60).

##### From Center

This draws the `Rect` similarly to `Canvas.drawCircle`. 

```dart
 Rect.fromCenter(
      center: Offset(size.width / 2, size.height / 2),
      width: 50,
      height: 60,
    );
```

This creates a `Rect` drawn at the center of the canvas, with a width of 50 and a height of 60.

##### From Circle

This draws a square from a center just like `Rect.fromCenter`;

```dart
Rect.fromCircle(
      center: Offset(size.width / 2, size.height / 2),
      radius: 60,
    );
```

##### From Points

This is about the same as `Rect.fromLTRB` except [L, T] & R, B are specified by offsets.

```dart
Rect.fromPoints(const Offset(50, 60), const Offset(120, 120));
```

This example does the same thing that the example for `Rect.fromLTRB` does, but with points.

Use whatever feels most intuitive to you. I prefer `Rect.fromLTWH`, so this is what is used for the rest of the article.

### Canvas.drawRRect

An `RRect` is just a rounded rectangle, hence, the name.

Using `canvas.drawRRect` is pretty similar to using `canvas.drawRect`, except that instead of using a `Rect`, we use an `RRect`.

```dart
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();
    paint.color = Colors.indigoAccent;

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(0, 0, size.width, size.height),
        const Radius.circular(24),
      ),
      paint,
    );
  }
```

![Rounded Rectangle drawn to the canvas using drawRRect](https://res.cloudinary.com/wilson-wilson/image/upload/v1624880935/articles/flutter-custom-paint-and-canvas/Screenshot_2021-06-28_at_12.48.48_hxzyex.png)

#### Creating an RRect

Just like a `Rect` there are many ways to create an `RRect`. Here are two of the most intuitive.

##### From Rect and Radius

Dart makes it possible to convert a `Rect` into an `RRect` by specifying a `Radius`. This constructor is pretty neat as you can use your favorite way to create a `Rect` to get started.

```dart
RRect.fromRectAndRadius(
  Rect.fromLTWH(0, 0, size.width, size.height),
  const Radius.circular(24),
);
```

This example creates an `RRect` as large as the canvas with a radius of 24 px.

##### From Rect and Corners

If you'd like to give each corner of the `RRect` a different radius, this constructor is just what you need.

```dart
RRect.fromRectAndCorners(
  Rect.fromLTWH(0, 0, size.width, size.height),
  topLeft: const Radius.circular(48),
  bottomRight: const Radius.circular(48),
);
```

This example creates a rectangle that fills the canvas. This Rectangle has a radius of 48px on the top left and the bottom right.

![Rounded Rectangle with radius on the top left and bottom right](https://res.cloudinary.com/wilson-wilson/image/upload/v1624881724/articles/flutter-custom-paint-and-canvas/Screenshot_2021-06-28_at_13.01.57_bnkjh6.png)

