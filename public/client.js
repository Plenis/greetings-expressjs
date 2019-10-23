document.addEventListener("DOMContentLoaded", function() {
  let errorMessage = document.querySelector(".info");
  let greetMessage = document.querySelector(".greeting-text");

  if (errorMessage === "") {
    setTimeout(function() {
      errorMessage.innerHTML = "";
    }, 3000);
  } else if (greetMessage === "") {
    setTimeout(function() {
      greetMessage.innerHTML = "";
    }, 3000);
  }
});
