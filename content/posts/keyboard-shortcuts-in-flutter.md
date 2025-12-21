---
title: Using Keyboard Shortcuts in Flutter Desktop. A Simple Guide.
date: 2021-02-01
tags: 
  - flutter
  - desktop
  - web
  - keyboard shortcuts
published: true
image: https://res.cloudinary.com/wilson-wilson/image/upload/v1622568897/featured/Keyboard-Shortcuts_xmlhj6.jpg
description: Learn how to listen to keyboard shortcuts the right way in Flutter Web and Desktop using the power of FocusableActionDetector.
---

A few weeks ago, I shared a [Pomodoro app built entirely with Flutter](https://github.com/wilsonowilson/Flutter-Pomodoro). Under normal circumstances, that would be boring. But this app was built to give an example of a basic **Desktop** app built with Flutter. It had everything you needed in a typical desktop app like window management, keyboard shortcuts, and even access to the menu bar.

![Pomodoro app built to showcase desktop features in Flutter like menu bar and keyboard shortcuts.](https://res.cloudinary.com/wilson-wilson/image/upload/v1622569906/articles/keyboard-shortcuts-in-flutter/P-S-1-079b1eda-63dc-11eb-9364-9e4837ce74f4_levxxj.png)

Check out the [repository](https://github.com/wilsonowilson/Flutter-Pomodoro)!

Today I wanted to write about one of those features, which as you may have guessed from the title, is **keyboard shortcuts** in Flutter! If you want to implement more desktop specific functionality like [hover effects in Flutter](https://wilsonwilson.dev/flutter-hover-effect-triggers-the-definitive-guide/), sign up to my [mailing list](http://wilsonwilson.dev) so you don't miss it!

In this tutorial, we will recreate the default counter app, but with keybindings to add and subtract the value when we press a shortcut.

## The wrong way

You may have come across the RawKeyboardListener widget (that has gotten a little more popular in recent times), which allows you to listen to "key-up" and "key-down" events on the keyboard.

```dart
@override
 Widget build(BuildContext context) {
   return RawKeyboardListener(
       autofocus: true,
       onKey: (event) {
         if (event.runtimeType == RawKeyDownEvent) {
          if (event.physicalKey == PhysicalKeyboardKey.keyX) {
             runSomeCode();
           }
         }
       },
       focusNode: FocusNode(),
       child: child,
    );
 }
```

You CAN implement keyboard shortcuts with this widget. But I do not recommend this for many reasons.

First of all, you can't work with multiple keys.

Not only will you have to filter for key-down events, but you won't be able to integrate this with other desktop-specific plugins (mostly due to the lack of a uniform implementation).

For example, if you would like to use the [menu bar plugin](https://github.com/google/flutter-desktop-embedding/tree/master/plugins/menubar) with your shortcuts, you would have to use the `LogicalKeySet`, which `RawKeyboardListener` is not based upon.

Plus, you'll not be able to access a lot of native functionality like key repeats and invalid key notifications (sounds).

In other words, using this widget to work with keyboard shortcuts is just, a bad idea 😖

![Stop It Chris Hemsworth GIF by NETFLIX.
Don't use RawKeyboardListener for you shortcuts!](https://media1.giphy.com/media/fSkpUE72ynxPsKVNYW/giphy.gif)

The widget is much better for getting input from the keyboard without using a `TextField`, which is also pretty useful 🚀

You can read more about RawKeyboardListener from this [article on medium](https://medium.com/@syazwan03nasir/flutter-how-to-use-rawkeyboardlistener-widget-6fb177918f29) or the [documentation](https://api.flutter.dev/flutter/widgets/RawKeyboardListener-class.html).

## The better way

A much better widget to use would be the [`FocusableActionDetector`](https://api.flutter.dev/flutter/widgets/FocusableActionDetector-class.html)` which comes with a _very_ simple API for listening to keyboard shortcuts.

It takes in a map of **shortcuts** (LogicalKeySet: Intent), and **actions** (Intent: Action).

### Intents and Actions

An Intent's major purpose is to describe an event/action. Take the example of a browser app with a keyboard shortcut that creates a new tab. An Intent for this would look like this:

```dart
class NewTabIntent extends Intent {}
```

That's really all you need to know. So in our counter example where we would like to increment and decrement the value with a keyboard shortcut, we would need the following Intents:

```dart
class IncrementIntent extends Intent {}
class DecrementIntent extends Intent {}
```

Actions on the other hand, are used to do something once an Intent is received. Once the action is "invoked", we execute some code! In our new tab example, an action for the intent would look like this:

```dart
CallbackAction(onInvoke: (_) => createNewTab())
```

There are different types of actions and intents for different scenarios. They are mostly descriptive, so the above examples may be all you need to create your app. You can see out [more types of actions and intents](https://github.com/flutter/flutter/blob/9b2d32b605/packages/flutter/lib/src/widgets/actions.dart#L1131) in the source code.

## Let's create the counter app!

Create a new flutter project for web/desktop. We will not be modifying much of the original source code. In case you want to use the Dartpad, here's the code (but without the comments 🙃):

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

![Default counter app in Flutter.](https://res.cloudinary.com/wilson-wilson/image/upload/v1622569900/articles/keyboard-shortcuts-in-flutter/Screen-Shot-2021-02-01-at-10.35.33-AM_anwtrd.png)

Since we will also be decrementing our counter, we should probably create a method for decrementing the counter.

```dart
void _decrementCounter() {
     setState(() {
       _counter--;
     });
   }
```

Awesome! Now that all the code we need for our counter is done! Let's start creating our shortcuts.

First of all, we need to create, our Intents and shortcut sets. Add two _top level_ logical keysets and two Intents for incrementing and decrementing the counter.

```dart
final incrementKeySet = LogicalKeySet(
   LogicalKeyboardKey.meta, // Replace with control on Windows
   LogicalKeyboardKey.arrowUp,
 );
 final decrementKeySet = LogicalKeySet(
   LogicalKeyboardKey.meta, // Replace with control on Windows
   LogicalKeyboardKey.arrowDown,
 );
 class IncrementIntent extends Intent {}
 class DecrementIntent extends Intent {}
```

> Notice how we are using LogicalKeyboardKey.meta. This represents the CMD key on macOS. On windows, replace this with LogicalKeyboardKey.control.
> 
> To see a list of all the possible logical keyboard keys in Flutter, [check out the documentation](https://api.flutter.dev/flutter/services/LogicalKeyboardKey-class.html).

Awesome! Now we can get on to creating our Widget which will listen to our shortcuts and respond to them. We'll call this widget `CounterShortcuts`. It will take a child, and two callbacks... one for responding to increment events, and one for responding to decrement events.

```dart
class CounterShortcuts extends StatelessWidget {
 const CounterShortcuts({
     Key key,
     @required this.child,
     @required this.onIncrementDetected,
     @required this.onDecrementDetected,
   }) : super(key: key);
 final Widget child;
   final VoidCallback onIncrementDetected;
   final VoidCallback onDecrementDetected;
...
```

Now we can finally build our widget with our `FocusableActionDetector` 🎉

I'll post the code, and explain it after.

```dart
@override
   Widget build(BuildContext context) {
     return FocusableActionDetector(
       autofocus: true,
       shortcuts: {
         incrementKeySet: IncrementIntent(),
         decrementKeySet: DecrementIntent(),
       },
       actions: {
         IncrementIntent:
             CallbackAction(onInvoke: (e) => onIncrementDetected?.call()),
         DecrementIntent:
             CallbackAction(onInvoke: (e) => onDecrementDetected?.call()),
       },
       child: child,
     );
   }
```

The `FocusableActionDetector` first of all, requires that we give it a child. In this case, it will be the counter widget.

Next, we need to think about how we manage its **focus**. In a larger app with many text fields and other widgets that may need focus on, we would ideally provide the FocusableActionDetector with a focus node and manage that on our own. But since we don't have anything else that could request focus in our app, we can simply set its `autofocus` parameter to `true`.

Now we need to give it our shortcuts and actions. In the shortcuts, we pass in a map of type `Map<LogicalKeySet, Intent>`. So for our `incrementKeySet`, we pass in `IncrementIntent`, and for the `decrementKeySet,` we provide `DecrementIntent`.

Our actions take in a map of type `Map<Type, Action>`. So for our `IncrementIntent`, we provide a `CallbackAction` that calls our `onIncrementDetected` callback when it is invoked, and similar for the `DecrementIntent`.

The last thing we need to do is wrap our counter with our `CounterShortcuts` widget. When `onIncrementDetected` is called, we increment the counter and we do similar for `onDecrementDetected`.

```dart
@override
   Widget build(BuildContext context) {
     return CounterShortcuts(
       onIncrementDetected: _incrementCounter,
       onDecrementDetected: _decrementCounter,
       child: Scaffold(
         appBar: AppBar(
           title: Text(widget.title),
         ),
...
```

And voila! We now have a fully functional counter app that responds to shortcuts 🚀

(For the sake of demonstration, I've added a snackbar that shows which keys are pressed).

![Incrementing and decrementing a counter with keyboard shortcuts in flutter](https://res.cloudinary.com/wilson-wilson/image/upload/v1622569937/articles/keyboard-shortcuts-in-flutter/counter-shortcut_gbkhtb.gif)

If you'd like to learn how to use the shortcuts with the menu bar, then join my [mailing list](http://wilsonwilson.dev)! A tutorial for that is coming soon 😃
