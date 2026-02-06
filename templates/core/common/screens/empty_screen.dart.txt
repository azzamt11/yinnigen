import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';


@RoutePage()
class EmptyScreen extends StatefulWidget {
  const EmptyScreen({super.key});

  @override
  State<EmptyScreen> createState() => _EmptyScreenState();
}

class _EmptyScreenState extends State<EmptyScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Container(
            height: constraints.maxHeight,
            width: constraints.maxWidth,
            color: Colors.white,
            child: Center(
              child: Text("404 NotFound"),
            ),
          );
        },
      ),
    );
  }
}