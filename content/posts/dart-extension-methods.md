---
title: Extension methods in Dart. How to use them effectively.
author: Wilson Wilson
description: This article introduces extension methods in Dart and how to use them in your applications. This is also the first article in the Dart on ice series.
series: dart-on-ice
slug: dart-extension-methods
published: true
tags:
  - dart
  - extension-methods
date: 2021-07-24 16:30:00
updated:
category: dart
---

Dart has so many cool features that make the language so much fun to use, many of which are unknown to newcomers. I created this series to help improve your Dart skills by introducing you to one great feature at a time, making Dart _cooler_ to use, hence the name, **Dart on Ice**!

> This series is written with null safety in mind.

Let's start by taking a look at extension methods in Dart, as well as how to use them practically in your applications.

## The extension keyword

Dart 2.7 introduced extension methods to the language. It allows you to add additional methods to any class. They are super helpful, especially for transformations on primitive Data like strings.

Let's start with an example. Let's say we wanted to check if a string is a URL or not.

```dart
void main() {
  final text = 'https://flutter.dev';
  final isUrl = text.contains('https://') || text.contains('http://');
}
```

> There are better ways of doing this, but this example should help convey the point enough.

This works great! But if we wanted to use this logic somewhere else, writing this repeatedly everywhere in the app would be far from ideal. So to solve this problem, we can create a global helper function that checks this for us.

```dart
bool isUrl(String text) {
  return text.contains('https://') || text.contains('http://');
}
```

Much better! Now you can reuse this code everywhere in your Flutter or Dart application. Still, Dart provides a much nicer way of handling this. Using extensions, we can write:

```dart
extension StringExt on String {
  bool get isUrl {
    return this.contains('https://') || this.contains('http://');
  }
}
```

Writing extensions give us "second-class" access to an object, allowing us to add additional methods, getters, or setters to any object. In this case, we declare an extension `StringExt` on `String`, then add a new getter to the String object `isUrl`. To refer to the object we are writing the extension for, we use the `this` keyword.

> Of course, you don't have to use the `this` keyword, but it's much easier to explain it like this.

Now we can check if a string is a url like this:

```dart
void main() {
  final text = 'https://flutter.dev';
  print(text.isUrl);
}
```

Here's another example of an extension on `DateTime`.

```dart
extension DateTimeExt on DateTime {
  DateTime get dateOnly {
    return DateTime(year, month, day);
  }
}
```

This returns a new `DateTime` with values for the day, month and year alone. In other words, it strips away the time from the date.

```dart
final date = DateTime.now(); // Saturday July 24th at 16:37
print(date);
print(date.dateOnly);
```

Running this example prints the following:

```
2021-07-24 16:37:46.613
2021-07-24 00:00:00.000
```

## More Examples of Dart Extensions in Real World Applications

There's so much you can do with Dart extensions in real-world applications. For example, if you're a Cloud Firestore user, you can use them to manage to retrieve your collection and document references.

```dart
extension FirestoreExt on FirebaseFirestore {
  CollectionReference get userCollection {
    return collection('users');
  }

  DocumentReference userDoc(String uid) {
    return userCollection.doc(uid);
  }

  CollectionReference get ticketCollection {
    return collection('tickets');
  }

  DocumentReference ticketDoc(String ticketId) {
    return ticketCollection.doc(ticketId);
  }
}
```

Now, if you wanted to retrieve the `userCollection`, for example, you'd call `firestore.userCollection`.

Here's an example of a [firebase app architected with extension methods](https://github.com/lukepighetti/fb_arch).

## Nullable types and Generics

Because nullable types and non-nullable types are different, an extension on `String?` will not work for `String` and vice-versa. Take a look at this example:

```dart
void main() {
  final text = getDateCreated(postId) // returns nullable string;
  final date = text.toDate(); // Completely invalid
}

String? getDateCreated(String postId) {
  return dataSource.lookupDate(postId);
}

extension StringExt on String {
  DateTime toDate() {
    return DateTime.parse(this);
  }
}
```

`text.toDate` doesn't work because the `text` from `getDateCreated` is nullable. Of course, if we're to use the bang operator (!) or the null aware operator (?), this would compile.

```dart
final date = text?.toDate();
```

Of course, you can also create extensions for nullable types.

```dart
extension UserExt on User? {
  String? get fullName {
    if (firstName == null || lastName == null) return null;
    return '$firstName $lastName';
  }
}
```

Dart also allows you to create extensions for classes with type parameters. Therefore, this example is totally valid:

```dart
extension CartListExt on List<CartItem> {
  double get totalCost {
    return fold(0, (previousValue, element) {
      return previousValue.price + element.price;
    });
  }
}
```

Dart even gives you the option of writing generic extensions. So you can create an extension with generic type parameters.

```dart
extension SetExt<T> on Set<T?> {
  // removes all null values in a set.
  void clean() {
    removeWhere((element) => element == null);
  }
}
```

## A Note on Imports

If you create an extension in one file and try to use it in another, you'd notice that you won't be able to use it in another without importing it. Manually importing the file containing your extension can be annoying if it is deeply nested in your folder structure.

To solve this problem, give your extensions clear, memorable names, like `StringExt`, `NumExt` or `UserExt` so you can automatically import them using their names in your IDE or text editor of choice.

## Anonymous extensions

If you don't give an extension a name, it becomes private, meaning that you can't use it in other files.

```dart
extension on String {
  DateTime toDate() {
    return DateTime.parse(this);
  }
}
```

This extension would only be available in the file it lives in. You can also do the same by adding an underscore (\_) before the name.

## Additional References

If you'd like to learn more about Dart extensions, be sure to look at the following resources.

<Youtube videoid="D3j0OSfT9ZI" />

- [Dart: Extension methods](https://dart.dev/guides/language/extension-methods) (Documentation)
- [How do I use Dart extension Functions](https://stackoverflow.com/a/58288266).
