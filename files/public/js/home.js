var currentShown = "none"
function showFunction(id, element) {
  var rsBlocks = document.getElementsByClassName("resourceBox");
  var elementTab = document.getElementsByClassName("elementBlock")
  for (var i  = 0; i < rsBlocks.length; i++) {
    rsBlocks[i].style.display = "none";
  }
  for (var i = 0; i < elementTab.length; i++) {
    elementTab[i].className = "elementBlock";
  }
  if (currentShown != id) {
    document.getElementById(id).style.display = "block";
    element.className = "elementBlock liHover";
    currentShown = id;

  } else {
    document.getElementById("baseBox").style.display = "block";
    element.className = "elementBlock";
    currentShown = "none";
  }
}
function modalDisplay() {
  var modal = document.getElementById("allHomework");
  var backModal = document.getElementById("modal");
  backModal.style.visibility = "visible";
  modal.style.display = "block";
}
function removeModal() {
  document.getElementById("allHomework").style.display = "none";
  document.getElementById("modal").style.visibility = "hidden";
}
function displayHomework(course) {
  var blocks = document.getElementsByClassName("modalBlock");
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].className = "modalBlock";
  }
  var boxes = document.getElementsByClassName("modalBox");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].className = "modalBox";
  }
  var specialBoxes = document.getElementsByClassName("boxBorder");
  for (var i = 0; i < specialBoxes.length; i++) {
    specialBoxes[i].className = "modalBlock";
  }
  document.getElementById(course + "CourseBox").className = "boxBorder";
  document.getElementById(course).className = "modalBox display";
}

function minutesToTime(min) {
  let hour = min/60;
  let minute = min%60;
  return [hour, minute];
}
function changeFunction(x) {
  x.classList.toggle("change");
  document.getElementById("holder").classList.toggle("expanded");
  document.getElementById("menu").classList.toggle("expand");
}
function confineFunction() {
  menuIcon.classList.toggle("change");
  document.getElementById("holder").classList.toggle("expanded");
  document.getElementById("menu").classList.toggle("expand");
}

function removeFunction(element, index) {
  if (confirm("Are you sure you would like to remove this homework?")) {


    let form = document.createElement("form");
    let input = document.createElement("input");
    input.type = "hidden";
    input.value = element + "_" + index;
    input.name = "removedHomework";
    form.action = "/";
    form.method = "POST";
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  } else {

  }
}
