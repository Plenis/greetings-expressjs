module.exports = function greetingOpp(pool) {
  var greetedNames = {};
  var message;
  var greeter;

  async function greet(name, lang) {
    var firstLetterUpperCase = name.toUpperCase().charAt(0) + name.slice(1);

    greeter = await pool.query(
      "select distinct greet_name, greet_count from greeted_names"
    );

    if (firstLetterUpperCase.length > 0) {
      var storage = await pool.query(
        "select * from greeted_names where greet_name = $1",
        [firstLetterUpperCase]
      );

      if (storage.rowCount === 1) {
        await pool.query(
          "UPDATE greeted_names greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1",
          [firstLetterUpperCase]
        );
      } else {
        await pool.query(
          "insert into greeted_names (greet_name, greet_count) values ($1, $2)",
          [firstLetterUpperCase, 1]
        );
      }
    }

    if (!name || !lang) {
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

  async function tableData() {
    await pool.query(
      "select distinct greet_name, greet_count from greeted_names"
    );
    console.log(greeter.rows)
    return greeter.rows;
  }

  async function nameCounter() {
   var counter = await pool.query("select * from greeted_names");
    return counter.rows.length;
  }

   function greetMessage() {
    return  message;
  }

  function storedNames() {
    return greetedNames;
  }

  return {
    greet,
    storedNames,
    nameCounter,
    greetMessage,
    tableData
  };
};
