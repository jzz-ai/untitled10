const BASE_URL = "http://localhost:8080";

function getToken() {
    return localStorage.getItem("token") || "";
}

function setLoginUser(data) {
    localStorage.setItem("token", data.token || "");
    localStorage.setItem("userId", data.id || "");
    localStorage.setItem("userName", data.name || "");
    localStorage.setItem("userEmail", data.email || "");
    localStorage.setItem("userRole", data.role || "");
}

function clearLoginUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
}

async function request(url, method = "GET", data = null) {
    const headers = {
        "Content-Type": "application/json"
    };

    const token = getToken();
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    const options = {
        method,
        headers
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + url, options);
    return await response.json();
}