// Page references
const welcomePage = document.getElementById("welcomePage");
const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const trackerPage = document.getElementById("trackerPage");

// Start → Go to Login
document.getElementById("startBtn").addEventListener("click", () => {
    welcomePage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

// Go to Signup
document.getElementById("goSignup").addEventListener("click", () => {
    loginPage.classList.add("hidden");
    signupPage.classList.remove("hidden");
});

// Go to Login
document.getElementById("goLogin").addEventListener("click", () => {
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

// Signup
document.getElementById("signupBtn").addEventListener("click", () => {
    const user = document.getElementById("signupUser").value;
    const pass = document.getElementById("signupPass").value;

    if (!user || !pass) {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("skinUser", JSON.stringify({ user, pass }));
    alert("Account created!");

    signupPage.classList.add("hidden");
    trackerPage.classList.remove("hidden");
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    const saved = JSON.parse(localStorage.getItem("skinUser"));

    if (!saved || saved.user !== user || saved.pass !== pass) {
        alert("Incorrect username or password");
        return;
    }

    loginPage.classList.add("hidden");
    trackerPage.classList.remove("hidden");
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    trackerPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

// Skin Suggestions
const suggestionBox = document.getElementById("suggestionText");
document.getElementById("condition").addEventListener("change", showSuggestion);

function showSuggestion() {
    const condition = document.getElementById("condition").value;

    const suggestions = {
        "Clear": "Keep up your routine! Stay hydrated and use sunscreen daily.",
        "Oily": "Use gel-based moisturizers, avoid heavy creams, and cleanse twice a day.",
        "Dry": "Use hydrating serums, thicker moisturizers, and avoid hot water.",
        "Redness": "Use calming products like aloe or centella. Avoid harsh scrubs.",
        "Acne": "Use salicylic acid or niacinamide. Avoid touching your face often."
    };

    suggestionBox.textContent = suggestions[condition];
    showProductSuggestions(condition);
}

// Product Suggestions
const productSuggestions = {
    "Clear": [
        "Lightweight gel moisturizer",
        "Daily sunscreen SPF 50",
        "Gentle foaming cleanser"
    ],
    "Oily": [
        "Oil-free gel moisturizer",
        "Salicylic acid face wash",
        "Niacinamide serum (10%)"
    ],
    "Dry": [
        "Hyaluronic acid serum",
        "Thick ceramide moisturizer",
        "Cream-based hydrating cleanser"
    ],
    "Redness": [
        "Aloe vera soothing gel",
        "Centella asiatica serum",
        "Fragrance-free moisturizer"
    ],
    "Acne": [
        "2% Salicylic acid serum",
        "Benzoyl peroxide spot treatment",
        "Non-comedogenic moisturizer"
    ]
};

function showProductSuggestions(condition) {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    productSuggestions[condition].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

// Save Entry
document.getElementById("saveBtn").addEventListener("click", saveEntry);

function saveEntry() {
    const condition = document.getElementById("condition").value;
    const products = document.getElementById("products").value;
    const photoInput = document.getElementById("photo");

    let photoURL = "";
    if (photoInput.files.length > 0) {
        photoURL = URL.createObjectURL(photoInput.files[0]);
    }

    const entry = {
        date: new Date().toLocaleDateString(),
        condition,
        products,
        photoURL
    };

    let entries = JSON.parse(localStorage.getItem("skinEntries")) || [];
    entries.push(entry);
    localStorage.setItem("skinEntries", JSON.stringify(entries));

    displayEntries();

    // RESET FORM
    document.getElementById("condition").value = "Clear";
    document.getElementById("products").value = "";
    document.getElementById("photo").value = "";
}

// Display Entries
function displayEntries() {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = "";

    const entries = JSON.parse(localStorage.getItem("skinEntries")) || [];

    entries.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "entry-card";

        card.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Condition:</strong> ${entry.condition}</p>
            <p><strong>Products:</strong> ${entry.products}</p>
            ${entry.photoURL ? `<img src="${entry.photoURL}">` : ""}
            <button class="deleteBtn" onclick="deleteEntry(${index})">Delete</button>
        `;

        entryList.appendChild(card);
    });
}

// Delete Entry
function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("skinEntries")) || [];

    entries.splice(index, 1);

    localStorage.setItem("skinEntries", JSON.stringify(entries));

    displayEntries();
}

displayEntries();
