class ApiResponse<T> {

  String? message;
  int code;
  T data;

  ApiResponse({
    required this.code,
    required this.message,
    required this.data,
  });

  factory ApiResponse.fromResponse(int code, String? message) {
    return ApiResponse(
      code: code, 
      message: message,
      data: null as T
    );
  }
}