function greetingOpp() {
  var greetedNames = {};

  function greet(name, lang) {
    var firstLetterUpperCase = name.toUpperCase().charAt(0) + name.slice(1);
    // var firstLetterUpper = name.toUpperCase();
    if (greetedNames[firstLetterUpperCase] === "") {
      greetedNames[firstLetterUpperCase] = 0;
    } else {
      greetedNames[firstLetterUpperCase]++;
    }

    if (lang === "isiXhosa") {
      return "Molo, " + firstLetterUpperCase + "!";
    } else if (lang === "English") {
      return "Hello, " + firstLetterUpperCase + "!";
    } else if (lang === "Afrikaans") {
      return "Awe, " + firstLetterUpperCase + "!";
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
