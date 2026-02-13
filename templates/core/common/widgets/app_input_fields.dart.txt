import 'package:flutter/material.dart';

class AppInputField extends StatefulWidget {
  const AppInputField({
    super.key,
    required this.hint,
    this.keyboardType,
    this.validator,
    this.onSaved,
    this.autofillHints,
    this.controller,
    this.obscureText = false,
    this.enableSuggestions,
    this.autocorrect,
    this.fillColor = Colors.white,
    this.contentPadding = const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
    this.borderRadius = 10,
    this.enabledBorderColor = Colors.black,
    this.enabledBorderWidth = 0.7,
    this.focusedBorderColor,
    this.focusedBorderWidth = 1.2,
    this.errorBorderColor = Colors.redAccent,
    this.errorBorderWidth = 1.0,
    this.focusedErrorBorderWidth = 1.2,
    this.prefixIcon,
    this.textStyle,
    this.hintColor = Colors.black38,
    this.focusGlowColor,
    this.focusGlowBlur = 14,
    this.focusGlowSpread = 1.5,
  });

  final String hint;
  final TextInputType? keyboardType;
  final FormFieldValidator<String>? validator;
  final FormFieldSetter<String>? onSaved;
  final Iterable<String>? autofillHints;
  final TextEditingController? controller;
  final bool obscureText;
  final bool? enableSuggestions;
  final bool? autocorrect;
  final Color fillColor;
  final EdgeInsetsGeometry contentPadding;
  final double borderRadius;
  final Color enabledBorderColor;
  final double enabledBorderWidth;
  final Color? focusedBorderColor;
  final double focusedBorderWidth;
  final Color errorBorderColor;
  final double errorBorderWidth;
  final double focusedErrorBorderWidth;
  final Widget? prefixIcon;
  final TextStyle? textStyle;
  final Color hintColor;
  final Color? focusGlowColor;
  final double focusGlowBlur;
  final double focusGlowSpread;

  @override
  State<AppInputField> createState() => _AppInputFieldState();
}

class _AppInputFieldState extends State<AppInputField> {
  late bool _isObscured;
  late final FocusNode _focusNode;

  @override
  void initState() {
    super.initState();
    _isObscured = widget.obscureText;
    _focusNode = FocusNode();
    _focusNode.addListener(_onFocusChanged);
  }

  @override
  void didUpdateWidget(covariant AppInputField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.obscureText != widget.obscureText) {
      _isObscured = widget.obscureText;
    }
  }

  void _onFocusChanged() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  void dispose() {
    _focusNode.removeListener(_onFocusChanged);
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context);
    final isPassword = widget.obscureText;
    final glowColor = widget.focusGlowColor ?? t.primaryColor;
    final isFocused = _focusNode.hasFocus;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 160),
      curve: Curves.easeOut,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(widget.borderRadius),
        boxShadow: isFocused
            ? [
                BoxShadow(
                  color: glowColor.withValues(alpha: 0.28),
                  blurRadius: widget.focusGlowBlur,
                  spreadRadius: widget.focusGlowSpread,
                ),
              ]
            : const [],
      ),
      child: TextFormField(
        focusNode: _focusNode,
        style: widget.textStyle ?? t.textTheme.bodyLarge?.copyWith(color: Colors.grey.shade800),
        obscureText: isPassword && _isObscured,
        keyboardType: widget.keyboardType,
        validator: widget.validator,
        onSaved: widget.onSaved,
        autofillHints: widget.autofillHints,
        enableSuggestions: widget.enableSuggestions ?? !isPassword,
        autocorrect: widget.autocorrect ?? !isPassword,
        controller: widget.controller,
        decoration: InputDecoration(
          hintText: widget.hint,
          hintStyle: (widget.textStyle ?? t.textTheme.bodyLarge)?.copyWith(
            color: widget.hintColor,
          ),
          floatingLabelBehavior: FloatingLabelBehavior.never,
          filled: true,
          fillColor: widget.fillColor,
          contentPadding: widget.contentPadding,
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            borderSide: BorderSide(
              color: widget.enabledBorderColor,
              width: widget.enabledBorderWidth,
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            borderSide: BorderSide(
              color: widget.focusedBorderColor ?? t.primaryColor,
              width: widget.focusedBorderWidth,
            ),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            borderSide: BorderSide(
              color: widget.errorBorderColor,
              width: widget.errorBorderWidth,
            ),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            borderSide: BorderSide(
              color: widget.errorBorderColor,
              width: widget.focusedErrorBorderWidth,
            ),
          ),
          prefixIcon: widget.prefixIcon,
          suffixIcon: isPassword
              ? IconButton(
                  icon: Icon(
                    _isObscured ? Icons.visibility_off : Icons.visibility,
                    color: Colors.grey,
                  ),
                  onPressed: () {
                    setState(() {
                      _isObscured = !_isObscured;
                    });
                  },
                )
              : null,
        ),
      ),
    );
  }
}
