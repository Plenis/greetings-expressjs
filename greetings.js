function greetingOpp() {
  var greetedNames = {};
  let message = "";

  function greet(name, lang) {
    var firstLetterUpperCase = name.toUpperCase().charAt(0) + name.slice(1);
    // var firstLetterUpper = name.toUpperCase();
    if(!name || !lang ){
      return;
    }
    if (greetedNames[firstLetterUpperCase] === undefined) {
      greetedNames[firstLetterUpperCase]++;
    } else {
      greetedNames[firstLetterUpperCase]++;
    }

    if (lang === "isiXhosa") {
      message = "Molo, " + firstLetterUpperCase + "!";
    } else if (lang === "English") {
      message = "Hello, " + firstLetterUpperCase + "!";
    } else if (lang === "Afrikaans") {
      message = "Awe, " + firstLetterUpperCase + "!";
    }

  }

  function nameCounter() {
    var greetedArray = Object.keys(greetedNames);
    return greetedArray.length;
  }

  function greetMessage(){
    return message;
  }

  function storedNames() {
    return greetedNames;
  }

  return {
    greet,
    storedNames,
    nameCounter,
    greetMessage
  };
}

module.exports = greetingOpp;
