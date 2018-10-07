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
  let addNotes = document.getElementsByClassName("addNote");
  for (var i = 0; i < addNotes.length; i++) {
    addNotes[i].style.display = "none";
  }
  let notesEnter = document.getElementsByClassName("addNoteEnter");
  for (var i = 0; i < notesEnter.length; i++) {
    notesEnter[i].style.display = "none";
  }
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

function addNotes(id, name) {
  let addNotes = document.getElementsByClassName("addNote");
  for (var i = 0; i < addNotes.length; i++) {
    addNotes[i].style.display = "none";
  }
  let notesEnter = document.getElementsByClassName("addNoteEnter");
  for (var i = 0; i < notesEnter.length; i++) {
    notesEnter[i].style.display = "none";
  }
  if (id.toString() !== "1") {
    var modal = document.getElementById("addNote_" + id);
    var backModal = document.getElementById("modal");
    backModal.style.visibility = "visible";
    modal.style.display = "block";
    let addDiv = document.createElement("div");
    addDiv.className = "plusNote";
    addDiv.innerHTML = "+";
    addDiv.setAttribute("onclick", `submitNotes('${id}', this, '${name}')`);
    document.getElementById("notesHeader_" + id).innerHTML = "notes for " + name + "<br>";
    document.getElementById("notesHeader_" + id).appendChild(addDiv);
  }
}
function submitNotes(id, element,name) {
  let noteEnter = document.getElementById("addNoteEnter_" + id);
  document.getElementById("addNotesHeader_" + id).innerHTML = "Add  " + name + " note: ";
  noteEnter.style.display = "block";
  for (var i = 0; i < 10; i++) {
    let noteLine = document.createElement("div");
    noteLine.className = "noteLine";
    let editableNoteLine = document.createElement("span");
    editableNoteLine.contentEditable = true;
    editableNoteLine.className = "editableNoteLine";
    let addNote = document.createElement("div");
    addNote.className = "confirmNote";
    addNote.innerHTML = "+";
    addNote.setAttribute("onclick", `submitNote('${id}', this)`)
    addNote.contentEditable = false;
    noteLine.appendChild(addNote);
    noteLine.appendChild(editableNoteLine);
    noteEnter.appendChild(noteLine);
  }
}

function submitNote(id, element) {
  let noteEnter = document.getElementById("addNoteEnter_" + id);
  let noteLine = document.createElement("div");
  noteLine.className = "noteLine";
  let editableNoteLine = document.createElement("span");
  editableNoteLine.contentEditable = true;
  editableNoteLine.className = "editableNoteLine";
  let addNote = document.createElement("div");
  addNote.className = "confirmNote";
  addNote.innerHTML = "+";
  addNote.setAttribute("onclick", `submitNote('${id}', this)`)
  addNote.contentEditable = false;
  noteLine.appendChild(addNote);
  noteLine.appendChild(editableNoteLine);
  noteEnter.appendChild(noteLine);
  if (element.parentNode.children[1].innerText) {
    let loadRequest;
    if (window.XMLHttpRequest) {
      // code for modern browsers
      loadRequest = new XMLHttpRequest();
    } else {
      // code for old IE browsers
      loadRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    loadRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
      }
    }
    loadRequest.open("GET", "/postHomework?text=" + element.parentNode.children[1].innerText + "&id=" + id, true);
    loadRequest.send();
    element.parentElement.children[1].contentEditable = false;
    element.parentElement.removeChild(element);
  }
}
