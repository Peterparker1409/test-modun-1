var userList = [];

// Retrieve userList from localStorage if available
if (localStorage.getItem('users')) {
    userList = JSON.parse(localStorage.getItem('users'));
}

var userTable = document.getElementById('userTable');

// Populate user list table
function populateUserList() {
    userTable.innerHTML = `
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  `;

    for (var i = 0; i < userList.length; i++) {
        var user = userList[i];

        var row = document.createElement('tr');
        row.innerHTML = `
      <td>${i + 1}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="editUser(${i})" >Edit</button>
        <button onclick="deleteUser(${i})">Delete</button>
      </td>
    `;

        userTable.appendChild(row);
    }
}

function saveUserListToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(userList));
}

// Handle user form submission
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var index = document.getElementById('index').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var user = {
        'username': username,
        'email': email,
        'password': password
    };

    if (index) {
        // Edit existing user
        userList[index] = user;
    } else {
        // Add new user
        userList.push(user);
    }

    saveUserListToLocalStorage();
    populateUserList();
    this.reset();
    document.getElementById('index').value = '';
});

// Handle edit user
function editUser(index) {
    var user = userList[index];
    document.getElementById('index').value = index;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;
}

// Handle delete user
function deleteUser(index) {
    userList.splice(index, 1);
    saveUserListToLocalStorage();
    populateUserList();
}

populateUserList();
