const uploadBox = document.getElementById("uploadBox");
const avatarInput = document.getElementById("avatarInput");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const githubError = document.getElementById("githubError");
const avatarError = document.getElementById("avatarError");


// Avatar Upload Interactions
uploadBox.addEventListener("click", () => avatarInput.click());

uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "#ff6f61";
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.style.borderColor = "rgba(255,255,255,0.2)";
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    avatarInput.files = e.dataTransfer.files;
    validateAvatar();
});

avatarInput.addEventListener("change", validateAvatar);


// Avatar Validation
function validateAvatar() {
    const file = avatarInput.files[0];
    avatarError.textContent = "";
    uploadBox.style.borderColor = "rgba(255,255,255,0.2)";

    if (!file) return true;

    if (!file.type.startsWith("image/")) {
        avatarError.textContent = "Please upload an image file (JPG or PNG).";
        return false;
    }

    if (file.size > 500000) {
        avatarError.textContent = "File is too large. Max size is 500KB.";
        return false;
    }

    return true;
}


// Input Validators
function validateName() {
    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Please enter at least 3 characters.";
        nameInput.classList.add("error");
        return false;
    }
    nameError.textContent = "";
    nameInput.classList.remove("error");
    return true;
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add("error");
        return false;
    }
    emailError.textContent = "";
    emailInput.classList.remove("error");
    return true;
}

function validateGithub() {
    if (!githubInput.value.trim().startsWith("@")) {
        githubError.textContent = "GitHub username must start with @";
        githubInput.classList.add("error");
        return false;
    }
    githubError.textContent = "";
    githubInput.classList.remove("error");
    return true;
}


// Real-time validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
githubInput.addEventListener("input", validateGithub);


// Form Submission
document.getElementById("ticketForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const valid =
        validateAvatar() &
        validateName() &
        validateEmail() &
        validateGithub();

    if (!valid) return;

    alert("Your ticket has been generated!");
});
