const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");

function addTask() {
    if (inputBox.value === '') {
        alert("you must add something");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        let edit = document.createElement("edit");
        edit.innerHTML = "&#x270E;";
        li.appendChild(edit);


    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }

    else if (e.target.tagName === "EDIT") {
        const listItem = e.target.parentElement;
        const currentText = listItem.firstChild.textContent;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        listItem.firstChild.replaceWith(input);

        input.focus();

        input.addEventListener("blur", function () {
            saveEditedText();
        });

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                saveEditedText();
            }
        });

        function saveEditedText() {
            const newText = input.value;
            const textNode = document.createTextNode(newText);
            input.replaceWith(textNode);
            saveData();
        }
    }

}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();