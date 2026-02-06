import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

ThemeData buildTheme() {
  var baseTheme = ThemeData.light().copyWith(
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color.fromARGB(255, 18, 153, 250),
      brightness: Brightness.light,
    ),
    scaffoldBackgroundColor: Colors.white,
    canvasColor: Colors.white,
    appBarTheme: const AppBarTheme(backgroundColor: Colors.white),
    primaryColor: const Color.fromARGB(255, 18, 153, 250),
  );

  final customTextTheme = GoogleFonts.quicksandTextTheme(baseTheme.textTheme).copyWith(
    headlineLarge: GoogleFonts.quicksand(
      fontSize: 37,
      fontWeight: FontWeight.w800,
      letterSpacing: 0.3,
    ),
    headlineMedium: GoogleFonts.quicksand(
      fontSize: 30,
      fontWeight: FontWeight.w700,
      letterSpacing: 0.2,
    ),
    headlineSmall: GoogleFonts.quicksand(
      fontSize: 20,
      fontWeight: FontWeight.w700,
      letterSpacing: 0.2,
    ),
    titleLarge: GoogleFonts.quicksand(
      fontSize: 18.5,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.2,
    ),
    titleMedium: GoogleFonts.quicksand(
      fontSize: 17,
      fontWeight: FontWeight.w700,
      letterSpacing: 0.2,
    ),
    titleSmall: GoogleFonts.quicksand(
      fontSize: 16.5,
      fontWeight: FontWeight.w600,
      letterSpacing: 0.2,
    ),
    bodyLarge: GoogleFonts.quicksand(
      fontSize: 15,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.2,
    ),
    bodyMedium: GoogleFonts.quicksand(
      fontSize: 12,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.2,
      height: 1.3
    ),
    bodySmall: GoogleFonts.quicksand(
      fontSize: 11,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.2,
    ),
  );

  return baseTheme.copyWith(
    textTheme: customTextTheme,
  );
}