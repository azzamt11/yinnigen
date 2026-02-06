import 'dart:async';

import 'package:chopper/chopper.dart';
import 'package:flutter/foundation.dart';

typedef JsonFactory<T> = T Function(Map<String, dynamic> json);

class JsonModelConverter extends JsonConverter {
  const JsonModelConverter(this.factories);

  final Map<Type, JsonFactory> factories;

  T? _decodeMap<T>(Map<String, dynamic> values) {
    final jsonFactory = factories[T];
    if (jsonFactory == null || jsonFactory is! JsonFactory<T>) {
      return null;
    }
    return jsonFactory(values);
  }

  List<T> _decodeList<T>(Iterable values) =>
      values.where((v) => v != null).map<T>((v) => _decode<T>(v)).toList();

  dynamic _decode<T>(entity) {
    if (entity is Iterable) return _decodeList<T>(entity as List);
    if (entity is Map<String, dynamic>) {
      return _decodeMap<T>(entity);
    }
    return entity;
  }

  @override
  FutureOr<Response<ResultType>> convertResponse<ResultType, Item>(
    Response response,
  ) async {
    debugPrint('================ RAW BACKEND (PRE-DECODE) ================');
    debugPrint('Status: ${response.statusCode}');
    debugPrint('Raw bodyString: ${response.bodyString}');
    debugPrint('==========================================================');
    final jsonRes = await super.convertResponse(response);
    return jsonRes.copyWith<ResultType>(body: _decode<Item>(jsonRes.body));
  }
}