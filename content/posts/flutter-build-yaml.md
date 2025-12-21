---
title: Build.yaml tips to make code generation for your Flutter projects more pleasant.
date: 2021-06-01
tags: 
  - dart
  - flutter
  - build_runner
published: true
image: https://res.cloudinary.com/wilson-wilson/image/upload/v1622568897/featured/build-yaml-tips_ihsp79.jpg
description: In this article, I cover a few "build.yaml" tips that can help you generate code for your Flutter projects faster and with less boilerplate.
---

If you've ever worked on a project that contains lots of generated code, you'll know how much of a pain it can be to manage. Not only do you have to deal with long build times, but you may also have to deal with a bunch of boilerplate.

Using a `build.yaml` file, you can alleviate some of the pains that come along with using code generation. This article will explore some practical ways you can use the **build.yaml** file to improve your workflow.

> The build.yaml file is not created during flutter create. To get started, create a build.yaml file at the top level of your project (next to pubspec.yaml).

## Enabling and disabling builders

Even though this is not the most practical reason for having a `build.yaml` file, this is a good first exposure to the file.

If you would like to enable or disable a builder for any reason, you can set the `enabled` property of the builder to false.

``` yaml{5}[build.yaml]
targets:
  $default:
    builders:
      freezed|freezed:
        enabled: false
```

## Generating code for specific files

By default, [build](https://github.com/dart-lang/build) analyzes all source files regardless of whether they depend on a code generator or not.

So unless all the files in your codebase use generated code 👀, stating the files you want to generate code for can be extremely helpful.

Not only will it reduce the time it takes to generate code *depending on the size of your project*, but it may also help you to enforce structure in your app.

To do this, add the files you want to generate to the `generate_for` property of the builder.

```yaml [build.yaml]
targets:
  $default:
    builders:
      json_serializable|json_serializable:
        enabled: true
        generate_for:
          - "lib/model/company.dart"
          - "lib/model/employee.dart"
```

Of course, you can always use wildcard matching to select files in a specific folder or with a name pattern.

```yaml [build.yaml]
targets:
  $default:
    builders:
      json_serializable|json_serializable:
        # This will only generate code for files 
        # in a "models" or "entities" folder.
        generate_for:
          - "**/models/**.dart"
          - "**/entities/**.dart"
      freezed|freezed:
        # This will only generate code for files 
        # that end with ".f.dart".
        generate_for:
          - "**/**.f.dart"
```

## Specifying global options

To illustrate why you'd bother with this, consider the following example of [json_serializable](https://pub.dev/packages/json_serializable) in action. 

In this example, we need to ensure that all our models convert their parameters to JSON and that no null parameter exists in the serialized output. However, because `explicitToJson` is false by default and `includeIfNull` is true by default, we have to repeat the annotation for all our models.

```dart
@JsonSerializable(
  explicitToJson: true,
  includeIfNull: false,
)
class Company {
  Company({
    required this.id,
    required this.name,
    required this.dateCreated,
    required this.employees,
  });

  final String id;
  final String name;
  final DateTime dateCreated;
  final Set<Employee> employees;
}

@JsonSerializable(
  explicitToJson: true,
  includeIfNull: false,
)
class Employee {
  Employee({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.dateCreated,
  });

  final String id;
  final String firstName;
  final String lastName;
  final DateTime dateCreated;
}
```

Copying the same configuration isn't painful with only two objects. But as that grows, forgetting to do so can become problematic.

Fortunately, generators like json_serializable let you update default values for its configuration in `build.yaml`.

So instead of copying and pasting the annotation everywhere, we can add this to our `build.yaml`.

```yaml{5,6,7}
targets:
  $default:
    builders:
      json_serializable|json_serializable:
        options:
          explicit_to_json: true
          include_if_null: false
```

Read more about the [json_serializable build configuration](https://pub.dev/packages/json_serializable#build-configuration).
