function submit() {
  var a1 = document.getElementById("q1").value;
  var a2 = document.getElementById("q2").value;
  var a3 = document.getElementById("q3").value;

  var score = 0;

  if (a1 == "42") {
    score = score + 1;
  }

  if (a2 == "4") {
    score = score + 1;
  }

  if (a3 == "hypertext markup language") {
    score = score + 1;
  }

  alert("Your score was: " + score + "/3. Good job!");
}
