// editable info

const publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1eP_MFBFQDHgqUHS1w1rA7Mql-ljVVhomrhcHmf7eIP4/edit?usp=sharing"; // change this to your own URL
const categoryStartNum = 3; // let the program know where the categoy begins on the spreadsheet column. Default value is 3.
const sheetName = "Sheet1"; // this has to match your google doc sheet name
const punctuation = ","; // this changes the punctuation between the title and the description. In most cases you'd want to use "," or "-" or ":"

// tableTop.js script
function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(data, tabletop) {
  const checked = "x";
  const columnArray = tabletop.sheets()[sheetName].columnNames;
  const columnName = [columnArray.length];

  for (let j = 0; j < columnArray.length; j++) {
    columnName[j] = columnArray[j];
  }

  // create sorting buttons
  for (let j = categoryStartNum; j < columnArray.length; j++) {
    addButton(columnName[j]);
  }

  console.log(data)
  // for (let i = categoryStartNum; i < columnArray.length; i++) {
  //   for (let j = 0; j < data.length; j++) {
  //     if (data[j][columnName[i]] == checked) {
  //       addElement(
  //         columnName[i],
  //         data[j][columnName[0]],
  //         data[j][columnName[1]],
  //         data[j][columnName[2]]
  //       );
  //     }
  //   }
  // }
  for (let j = 0; j < data.length; j++) {
    let checkedCats = []
    for (let i = categoryStartNum; i < columnArray.length; i++) {
      if (data[j][columnName[i]] == checked) {
        checkedCats.push(columnName[i])
      }
      
    }
    addElementNEW(
      checkedCats,
      data[j][columnName[0]],
      data[j][columnName[1]],
      data[j][columnName[2]]
    );

  }
  // alert("Successfully processed!"); // check if data is imported
}

let activeConcentrations = []
let activeSelection = []
function addButton(columnName) {
  console.log(columnName)
  const name = columnName.split("$")[0]
  let cat = columnName.split("$")[1]==undefined?"all":columnName.split("$")[1];

  const newButton = document.createElement("BUTTON");
  const newButtonContent = document.createTextNode(name);

  newButton.appendChild(newButtonContent);
  newButton.className = "btn " + cat;
  newButton.addEventListener("click", function() {
    if(newButton.innerHTML == "All"){
      let btnClassArray = document.getElementsByClassName("btn");
      for (let i = 0; i < btnClassArray.length; i++) {
        btnClassArray[i].classList.remove("active");
      }
      activeSelection = ["All"]
      activeConcentrations = ["All"]
    }else{
      let btnClassArray = document.getElementsByClassName("btn");
      for (let i = 0; i < btnClassArray.length; i++) {
        if(btnClassArray[i].innerHTML == "All"){
          btnClassArray[i].classList.remove("active");
        }
      }
    }
    // if(newButton.classList.contains("conc")){
    //   if(activeConcentrations[0] == "All")
    // }

    if(newButton.classList.contains("active")){
      newButton.classList.remove("active");
      activeSelection.remove(columnName)
    }else{
      newButton.classList.add("active");
      activeSelection.push(columnName)
    }
    filterSelection(columnName);
    console.log(activeSelection)
    // btnOff(); // turns off all active buttons
     // turn this button on
  });
  cat = cat=="all"?"conc":cat;
  document.getElementById(cat+"-button-container").appendChild(newButton);
}

function btnOff() {
  let btnClassArray = document.getElementsByClassName("btn");
  for (let i = 0; i < btnClassArray.length; i++) {
    if (btnClassArray[i].classList.contains("active")) {
      btnClassArray[i].classList.remove("active");
    }
  }
}

function addElement(columnName, person, url, description) {
  const hashtag1 = ["filterDiv"];
  const hashtag2 = [columnName];
  const hashtagArray = hashtag1.concat(hashtag2);
  const hashtagString = hashtagArray.join(" ");
  const newDiv = document.createElement("div");
  newDiv.className = hashtagString;

  // place individual link inside individual div
  for (let i = 0; i < 1; i++) {
    let link = document.createElement("a");
    let linkContent = document.createTextNode(person);
    link.appendChild(linkContent);
    link.title = person;
    link.href = url;
    link.className = "itemLink";

    let para = document.createElement("p");
    let paraContent = document.createTextNode(`${punctuation} ${description}`);
    para.appendChild(paraContent);
    para.className = "itemPara";

    para.appendChild(link); // put <a> into <p>
    link.after(paraContent); // put <p> description after <a>
    newDiv.appendChild(para); // put <p> into newDiv
  }
  document.getElementsByClassName("container")[0].appendChild(newDiv);
}

function addElementNEW(columnNames, person, url, description) {
  const hashtag1 = ["filterDiv"];
  const hashtag2 = columnNames;
  const hashtagArray = hashtag1.concat(hashtag2);
  const hashtagString = hashtagArray.join(" ");
  const newDiv = document.createElement("div");
  newDiv.className = hashtagString;

  // place individual link inside individual div
  for (let i = 0; i < 1; i++) {
    let link = document.createElement("a");
    let linkContent = document.createTextNode(person);
    link.appendChild(linkContent);
    link.title = person;
    link.href = url;
    link.className = "itemLink";

    let para = document.createElement("p");
    let paraContent = document.createTextNode(`${punctuation} ${description}`);
    para.appendChild(paraContent);
    para.className = "itemPara";

    para.appendChild(link); // put <a> into <p>
    link.after(paraContent); // put <p> description after <a>
    newDiv.appendChild(para); // put <p> into newDiv
  }
  document.getElementsByClassName("container")[0].appendChild(newDiv);
}

window.addEventListener("DOMContentLoaded", init);

// filter script
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  for (i = 0; i < x.length; i++) {
    // w3RemoveClass(x[i], "show");
    // if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");

    w3AddClass(x[i], "show")
    for(cat of activeSelection){
      console.log(cat)
      if (x[i].className.indexOf(cat) == -1) w3RemoveClass(x[i], "show");
    }
    
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}



// got this from https://stackoverflow.com/a/3955096
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};