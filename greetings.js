function greetingOpp(nameList) {
  var greetedNames = nameList || {};

  function greet(name, lang) {
    var firstLetterUpperCase = name.toUpperCase().charAt(0) + name.slice(1);
    var firstLetterUpper = name.toUpperCase();
    if (greetedNames[firstLetterUpper] === undefined) {
      greetedNames[firstLetterUpper] = 1;
    } else {
      greetedNames[firstLetterUpper]++;  
    }

    if (lang === "isiXhosa") {
      return "Molo, " + firstLetterUpperCase + "!";
    } else if (lang === "English") {
      return "Hello, " + firstLetterUpperCase + "!";
    } else if (lang === "Afrikaans") {
      return "Awe, " + firstLetterUpperCase + "!";
    } else {
      return "Please enter a name or select a language!";
    }
  }

  function nameCounter() {
    var greetedArray = Object.keys(greetedNames);
    return greetedArray.length;
  }

  function storedNames() {
    return greetedNames;
  }

  return {
    greet,
    storedNames,
    nameCounter
  };
}

module.exports = greetingOpp;
