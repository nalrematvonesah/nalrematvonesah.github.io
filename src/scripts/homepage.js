function validateSignupForm(e) {
    e.preventDefault();
    let isValid = true;

    const getField = (id) => document.getElementById(id);
    const getValue = (id) => getField(id).value.trim();
    const setError = (id, msg) => {
        getField(id + '-error').innerText = msg;
        isValid = false;
    };

    ['name', 'email', 'password', 'confirmPassword'].forEach(field => {
        getField(field + '-error').innerText = '';
    });

    const name = getValue('name');
    if (name === '') {
        setError('name', 'Name is required.');
    }

    const email = getValue('email');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === '') {
        setError('email', 'Email is required.');
    } else if (!emailPattern.test(email)) {
        setError('email', 'Enter a valid email address.');
    }

    const password = getField('password').value;
    if (password.length < 8) {
        setError('password', 'Password must be at least 8 characters.');
    }

    const confirmPassword = getField('confirmPassword').value;
    if (confirmPassword !== password) {
        setError('confirmPassword', 'Passwords do not match.');
    }

    if (isValid) {
        alert('Form submitted successfully!');
        this.reset();
    }
}

document.getElementById('signupForm').addEventListener('submit', validateSignupForm);

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('accordion-active');
    });
});