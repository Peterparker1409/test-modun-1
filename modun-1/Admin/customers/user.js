// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

var userList = [];

if (localStorage.getItem("users")) {
  userList = JSON.parse(localStorage.getItem("users"));
}

var userTable = document.getElementById("userTable");

//? Điền vào bảng danh sách người dùng
function populateUserList() {
  userTable.innerHTML = `
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Email</th>
      <th>Block</th>
    </tr>
  `;

  for (var i = 0; i < userList.length; i++) {
    var user = userList[i];

    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>
        <input type="checkbox" id="check${i}" ${user.isLocked ? 'checked' : ''} onchange="toggleLock(${i}, this.checked)">
      </td>
    `;

    userTable.appendChild(row);
  }
}

//? Function lưu tên localstorage
function saveUserListToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(userList));
}

//? Toggle khóa
function toggleLock(index, checked) {
  userList[index].isLocked = checked;
  saveUserListToLocalStorage();
}

populateUserList();
