---
title: CSS Style Blending using Flutter
date: 2020-12-10
tags:
  - design
  - flutter
published: true
image: https://res.cloudinary.com/wilson-wilson/image/upload/v1622568897/featured/css-style-blending_u6ag51.jpg
description: This article will show you how to apply Blend Modes to widgets in flutter like you can in CSS using your very own custom RenderObjects
---

A few weeks ago, I stumbled upon the [Cuberto](https://cuberto.com) site. The site design is absolutely mesmerizing, and I fell in love with it almost immediately. But out of all the elements on the site, one of them, in particular, stood out to me. The pointer.

Custom mouse pointers are nothing new... but this one was different. As it moves closer to the hero, the pointer transforms into a video, and as it hovers over a title, the image and the text _blend together_. You can see it for yourself on the website.

![](https://res.cloudinary.com/wilson-wilson/image/upload/v1622569446/articles/css-style-blending/Screenshot-2020-12-10-at-22.36.27_aazqql.png)

Being the self-proclaimed Flutter enthusiast that I am, I immediately thought... "how can this be done in Flutter?".

In CSS it's simple. All you have to do is use the [mix-blend-mode property](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode), and you're good to go. But it wasn't as straightforward as I thought it would be in Flutter.

> Spoiler alert! I managed to recreate it and you can check out the [source code](https://github.com/wilsonowilson/Flutter-Hover-Effects/blob/master/lib/demos/5-Cuberto/cuberto.dart). Unfortunately, the blend modes, as well as text border, don't work on the web, but it runs perfectly on every other platform. P.S - If you want to read about hover effects in Flutter, [check this out](https://wilsonwilson.dev/flutter-hover-effect-triggers-the-definitive-guide/).

<Youtube videoid="prBZZOIFTvY" />

If you would like to know how the blending is done, read on!

Blending colors, gradients, and ./img in Flutter isn't [anything special](https://medium.com/codechai/blend-it-like-anything-3fe67148f3f4).

The `Image` widget has a `colorBlendMode` property that allows you to apply a BlendMode to the Image. But that's the problem, it only allows you to use colors.

What if you wanted to blend an image with another image?

No, let's be daring. What if we wanted to blend a widget with another widget?

I thought it was a trivial question. I couldn't be the only one who needed this functionality. Luckily, I wasn't.

A few questions had been raised on [StackOverflow](https://stackoverflow.com/questions/56976445/how-to-overlay-a-widget-in-flutter-with-another-widget-opacity-set-to-multiply) which were similar to mine. But most of the answers were workarounds that fit a particular case, making them unusable for other cases.

Finally, I resorted to asking my own question, which was never answered.

## The solution

The solution to my problem came from a place I didn't expect. [`RenderObjects`](https://api.flutter.dev/flutter/rendering/RenderObject-class.html).

`RenderObjects` are basically blueprints for widgets. They allow you to manipulate how a widget is drawn. Widgets like `Padding`, `Opacity`, `Transform` and `ShaderMask` are all `RenderObjects`.

The key is, they change the way a widget is drawn.

So when I came across the [blend mask widget in the GSkinner repo](https://github.com/gskinnerTeam/flutter_vignettes/blob/master/vignettes/_shared/lib/ui/blend_mask.dart), everything clicked instantly.

```dart
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';

class BlendMask extends SingleChildRenderObjectWidget {
  final BlendMode blendMode;
  final double opacity;

  BlendMask({
    @required this.blendMode,
    this.opacity = 1.0,
    Key key,
    Widget child,
  }) : super(key: key, child: child);

  @override
  RenderObject createRenderObject(context) {
    return RenderBlendMask(blendMode, opacity);
  }

  @override
  void updateRenderObject(BuildContext context, RenderBlendMask renderObject) {
    renderObject.blendMode = blendMode;
    renderObject.opacity = opacity;
  }
}

class RenderBlendMask extends RenderProxyBox {
  BlendMode blendMode;
  double opacity;

  RenderBlendMask(this.blendMode, this.opacity);

  @override
  void paint(context, offset) {
    context.canvas.saveLayer(
      offset & size,
      Paint()
        ..blendMode = blendMode
        ..color = Color.fromARGB((opacity \* 255).round(), 255, 255, 255),
    );

    super.paint(context, offset);

    context.canvas.restore();
  }
}
```

Here, when the `BlendMask` widget is rendered, it applies a blend mode to its child. Now any widget drawn under it will have the effect applied to it.

Using it is simple. Just apply the BlendMask to a widget higher in a Stack.

```dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Center(
            child: Container(
              width: 200,
              height: 200,
              color: Colors.green,
            ),
          ),
          Positioned(
            top: MediaQuery.of(context).size.height / 2,
            left: 350,
            child: BlendMask(
              blendMode: BlendMode.difference,
              child: Container(
                width: 150,
                height: 150,
                color: Colors.yellow,
              ),
            ),
          ),
        ],
      ),
    );
  }
```

And bam! Any widget under it will be affected by the BlendMode you set. In this example, I use BlendMode.difference which yields the following result:

![](https://res.cloudinary.com/wilson-wilson/image/upload/v1622569446/articles/css-style-blending/Screenshot-2020-12-10-at-23.28.21_wgpnbd.png)

Using this method, you can blend _almost_ every widget! The following picture shows two images blended with mix-blend-mode \[multiply\] in css (left) and using BlendMask with BlendMode.multipy in Flutter (right).

![Blendmode CSS vs Flutter](https://res.cloudinary.com/wilson-wilson/image/upload/v1622569448/articles/css-style-blending/NXQuc_qbn0ts.png)

```dart

class ImageMixer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox.expand(
          child: Stack(
        children: [
          SizedBox.expand(
            child: Image.asset(
              './img/sky.jpg',
            ),
          ),
          BlendMask(
            opacity: 1.0,
            blendMode: BlendMode.softLight,
            child: SizedBox.expand(
              child: Image.asset(
                './img/monkey.jpg',
              ),
            ),
          ),
        ],
      )),
    );
  }
}
```

The effect is pretty neat, and also pretty easy to use!
