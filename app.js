let input = document.querySelector(".task-value");
let btn = document.querySelector(".btn-clear");
let ul = document.querySelector(".list-tasks");
let defaultValue = document.querySelector("#default");

let lsData = JSON.parse(localStorage.getItem("Tasks"));
let empty = [];
// if localstorage data is empty so it return undefined or null and checker become empty array so by clicking we push data in it and we store checker in local storage and we rander it data if we refresh than cheker data have value of local storage so it render ls data at that moment bcz we call render data
let checker = lsData || empty;

window.addEventListener("load", () => {
  let load = document.querySelector(".load");
  load.classList.add("hide");
});

// Rendering Call
renderData();

// Insert and Validate Data
input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    defaultValue.remove();
    let value = input.value.trim();
    if (value == "") {
      alert("Value is empty! Please enter some value");
      renderData();
    } else {
      checker.push(value);
      console.log("hello");
      saveData();
      renderData();
    }
    input.value = "";
  }
});
// Store data in LocalStorage
function saveData() {
  localStorage.setItem("Tasks", JSON.stringify(checker));
}
// Render elements
function renderData() {
  // Append Element in Ul
  if (checker == "") {
    ul.innerHTML = "";
    ul.append(defaultValue);
  } else {
    ul.innerHTML = "";
    checker.forEach((task) => {
      let li = document.createElement("li");
      li.classList.add("js-list");

      let checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.classList.add("select-box");

      let para = document.createElement("p");
      para.classList.add("text-elements");
      para.innerText = task;

      li.prepend(checkBox);
      li.append(para);
      ul.appendChild(li);
    });
    // Single To-do Delete
    let paras = document.querySelectorAll(".text-elements");
    for (const para of paras) {
      para.addEventListener("click", (e) => {
        e.stopPropagation();
        let index = checker.indexOf(para.innerText);
        checker.splice(index, 1);
        para.parentElement.remove();
        renderData();
        saveData();
      });
    }
  }
}
//  To-do Task Checked
ul.addEventListener("click", (e) => {
  const chkBox = e.target;
  let nextSibling = chkBox.nextElementSibling;
  nextSibling.classList.toggle("underline");
});
// Clear All Buttom
btn.addEventListener("click", (e) => {
  checker = [];
  localStorage.clear();
  renderData();
});
