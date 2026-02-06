import 'dart:async';
import 'package:chopper/chopper.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class ServiceLoggingInterceptor implements Interceptor {
  @override
  FutureOr<Response<BodyType>> intercept<BodyType>(Chain<BodyType> chain) async {
    final Request request = chain.request;

    // --- 1. Log Request ---
    debugPrint('==================== REQUEST START ====================');
    debugPrint('--> ${request.method} ${request.url}');
    final http.BaseRequest baseRequest = await request.toBaseRequest();
    if (baseRequest is http.Request && baseRequest.body.isNotEmpty) {
      debugPrint('Body: ${baseRequest.body}');
    }
    debugPrint('====================== REQUEST END =====================');

    final Stopwatch stopWatch = Stopwatch()..start();

    try {
      final Response<BodyType> response = await chain.proceed(request);
      stopWatch.stop();
      return response;
    } catch (e) {
      stopWatch.stop();
      debugPrint('==================== ERROR START ===================');
      debugPrint('URL: ${request.url}');
      debugPrint('TIME: ${stopWatch.elapsedMilliseconds}ms');
      
      // Check if it's a Chopper error that contains the response
      if (e is Response) {
        debugPrint('Status Code: ${e.statusCode}');
        debugPrint('Raw Body from Error: ${e.bodyString}');
      }
      
      debugPrint('ERROR DETAILS: $e');
      debugPrint('==================== ERROR END ========================');
      rethrow;
    }
  }
}