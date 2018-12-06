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
function choosePhoto(id) {
  let input = document.getElementById("cameraSelect_" + id);
  input.click();
}
function fileChanged(id) {
  let files = document.getElementById("cameraSelect_" + id);
  let curFiles = files.files[0];
  let image = document.createElement("img");
  image.src = window.URL.createObjectURL(curFiles);
  let imageHolder = document.createElement("div", 1.0);
  imageHolder.className = "noteImage";
  imageHolder.appendChild(image);
  imageHolder.style.opacity = "0.6";

  
  document.getElementById("allNoteImages_" + id).appendChild(imageHolder);


  let formData = new FormData();
  formData.append("file", curFiles);
  formData.append("text", "yeeter");
  for (var [key, value] of formData.entries()) { 
    console.log(key, value);
  }
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
      imageHolder.style.opacity = "1";
      let response = (JSON.parse(this.responseText));
      imageHolder.innerHTML += `<div class = "removeImageNote" onclick = "removeNoteImage('${response._id}', this)"></div>`;
    }
  }
  loadRequest.open("POST", "/postHomeworkImage?id=" + id, true);
  loadRequest.send(formData); 
}
function removeNoteImage(id, element) {
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
      element.parentElement.parentElement.removeChild(element.parentElement);
    }
  }
  loadRequest.open("GET", "/postHomework?action=removeNote&id=" + id, true);
  loadRequest.send(); 
}
function submitNotes(id, element,name) {
  let noteEnter = document.getElementById("addNoteEnter_" + id);
  document.getElementById("addNotesHeader_" + id).innerHTML = "Add  " + name + ` note: <img src = '/public/images/camera.svg' class = 'cameraIcon' onclick = "choosePhoto('${id}')"/><input onchange = 'fileChanged("${id}")' id = 'cameraSelect_${id}' style = 'display: none' type = 'file' accept = 'image/*' capture = 'enviornment'>`;

  noteEnter.style.display = "block";
  for (var i = 0; i < 10; i++) {
    let noteLine = document.createElement("div");
    noteLine.className = "noteLine";
    let editableNoteLine = document.createElement("span");
    editableNoteLine.contentEditable = true;
    editableNoteLine.className = "editableNoteLine";
    let addNote = document.createElement("div");
    addNote.className = "confirmNote";
    let spacer1 = document.createElement("div");
    spacer1.className = "spacer";
    spacer1.style.flexGrow = "1";
    let spacer2 = document.createElement("div");
    spacer2.className = "spacer";
    spacer2.style.flexGrow = "1";
    addNote.appendChild(spacer1);
    addNote.innerHTML += "+";
    addNote.appendChild(spacer2);
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
  let spacer1 = document.createElement("div");
  spacer1.className = "spacer";
  spacer1.style.flexGrow = "1";
  let spacer2 = document.createElement("div");
  spacer2.className = "spacer";
  spacer2.style.flexGrow = "1";
  addNote.appendChild(spacer1);
  addNote.innerHTML += "+";
  addNote.appendChild(spacer2);
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
        let response = (JSON.parse(this.responseText));
        console.log(response);
        element.parentElement.children[1].contentEditable = false;
        let removeElement = document.createElement("div");
        removeElement.className = "removeNote";
        let spacer1 = document.createElement("div");
        spacer1.className = "spacer";
        spacer1.style.flexGrow = "1";
        let spacer2 = document.createElement("div");
        spacer2.className = "spacer";
        spacer2.style.flexGrow = "1";
        removeElement.appendChild(spacer1);
        removeElement.innerHTML += "X";
        removeElement.appendChild(spacer2);
        removeElement.setAttribute("onclick", `removeNote('${response._id}', this)`);
        element.parentElement.replaceChild(removeElement, element);
      }
    }
    loadRequest.open("GET", "/postHomework?text=" + element.parentNode.children[1].innerText + "&id=" + id, true);
    loadRequest.send(); 
  }
}

function removeNote(id, element) {
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
      element.parentElement.parentElement.removeChild(element.parentElement);
    }
  }
  loadRequest.open("GET", "/postHomework?action=removeNote&id=" + id, true);
  loadRequest.send(); 
}
