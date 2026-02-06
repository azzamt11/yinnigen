extension ListExtension<T> on Iterable<T> {

  T? get firstOrNull {
    if (isEmpty) {
      return null;
    }
    return first;
  }

  T? get lastOrNull {
    if (isEmpty) {
      return null;
    }
    return last;
  }

  List<List<T>> group(int groupSize) {
    if (groupSize <= 0) {
      throw ArgumentError('Group size must be greater than 0');
    }

    final List<T> list = toList();

    List<List<T>> groupedList = [];
    for (int i = 0; i < list.length; i += groupSize) {
      int end = (i + groupSize < list.length) ? i + groupSize : list.length;
      groupedList.add(list.sublist(i, end));
    }
    return groupedList;
  }

  List<List<Map<String, dynamic>>> groupWithIndex(int groupSize) {
    if (groupSize <= 0) {
      throw ArgumentError('Group size must be greater than 0');
    }

    final List<T> list = toList();
    final List<Map<String, dynamic>> indexedList = [];

    for (int i = 0; i < list.length; i++) {
      indexedList.add({
        'id': i,
        'val': list[i],
      });
    }

    final List<List<Map<String, dynamic>>> groupedList = [];
    for (int i = 0; i < indexedList.length; i += groupSize) {
      int end = (i + groupSize < indexedList.length) ? i + groupSize : indexedList.length;
      groupedList.add(indexedList.sublist(i, end));
    }

    return groupedList;
  }

  List<T?> evenify() {
    final List<T> originalList = toList();
    final List<T?> evenifiedList = [...originalList];
    
    if (evenifiedList.length.isOdd) {
      evenifiedList.add(null);
    }
    
    return evenifiedList;
  }

  List<Map<String, dynamic>> indexify() {
    return toList().asMap().entries.map((entry) {
      return {
        'id': entry.key,
        'val': entry.value,
      };
    }).toList();
  }

  T? firstWhereOrNull(bool Function(T element) test) {
    for (final element in this) {
      if (test(element)) {
        return element;
      }
    }
    return null;
  }
}