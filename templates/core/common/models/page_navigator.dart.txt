class PageNavigator {

  String? route;
  Param? param;

  PageNavigator({
    required this.route,
    required this.param
  });

}


class Param {

  int? page;
  String? query;

  Param({
    required this.page,
    required this.query
  });
}