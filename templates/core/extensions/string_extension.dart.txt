extension TranslatableString on String {
  String tr(String? language) {

    if(language == "en" || language == null) {
      return this;
    }
    
    final translations = {
      'id': {
        //words on translation
      },
    };

    return translations['id']?[this] ?? this;
  }

  String toProperCase() {
    if (isEmpty) {
      return this;
    }
    
    String lowerCaseString = toLowerCase();
    
    List<String> words = lowerCaseString.split(' ');
    
    List<String> properCaseWords = words.map((word) {
      if (word.isEmpty) {
        return '';
      }
      return word[0].toUpperCase() + word.substring(1);
    }).toList();
    
    return properCaseWords.join(' ');
  }
}