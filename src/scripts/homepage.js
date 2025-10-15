document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    ['name', 'email', 'password', 'confirmPassword'].forEach(field => {
    document.getElementById(field + '-error').innerText = '';
});

    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('name-error').innerText = 'Name is required.';
        isValid = false;
    }

    
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === '') {
        document.getElementById('email-error').innerText = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('email-error').innerText = 'Enter a valid email address.';
        isValid = false;
    }

    
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        document.getElementById('password-error').innerText = 'Password must be at least 8 characters.';
        isValid = false;
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword !== password) {
    document.getElementById('confirmPassword-error').innerText = 'Passwords do not match.';
    isValid = false;
    }

    if (isValid) {
    alert('Form submitted successfully!');
    this.reset();
    }
});

// Accordion toggle
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.classList.toggle('accordion-active');
});
});
