document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn gửi form

    // Kiểm tra thông tin đăng nhập
    var username = document.getElementById("username").value;
    var password = document.getElementById("pass").value;

    if (username === "admin" && password === "123") {
        // Đăng nhập thành công, chuyển hướng đến trang admin
        window.location.href = "http://127.0.0.1:5502/Admin/admin.html";
    } else {
        // Hiển thị thông báo lỗi đăng nhập
        document.getElementById("loginMessage").innerHTML = "Invalid username or password.";
    }
});
