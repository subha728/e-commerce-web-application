function logout() {
    localStorage.removeItem("token");

    alert("Logged out successfully");

    window.location.href = "login.html";
}

function checkLogin() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
    }
}