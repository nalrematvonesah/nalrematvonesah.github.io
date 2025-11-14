tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'tmnt-green': '#1DB954',
                'tmnt-purple': '#845EF7',
                'tmnt-dark': '#121212',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
}

const USERS_KEY = 'tmnt_users';
const CURRENT_USER_KEY = 'tmnt_current_user';

let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

const authContentDiv = document.getElementById('auth-content');

// --- Utility Functions ---

/**
 * Custom Toast Notification (used instead of alert/confirm)
 */
function showToast(message, type = 'bg-tmnt-green') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-xl shadow-lg text-white ${type} max-w-sm flex justify-between items-center opacity-0 transition-opacity duration-300`;
    toast.innerHTML = `<span>${message}</span>`;

    container.prepend(toast);

    setTimeout(() => toast.classList.remove('opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Generic Form Validation and Specific Registration Logic
 */
function validateForm(form) {
    let isValid = true;
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.textContent = '');

    if (form.id === 'registrationForm') {
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        // Required Fields check
        const requiredFields = [form.name, form.email, form.password, form.confirmPassword];
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                document.getElementById(`${field.id}-error`).textContent = 'This field is required.';
                isValid = false;
            }
        });

        // Email validation
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email-error').textContent = 'Invalid email format.';
            isValid = false;
        }

        // Password complexity: min 8 chars, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (password && !passwordRegex.test(password)) {
            document.getElementById('password-error').textContent = 'Must be 8+ chars, incl. upper, lower, and number.';
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('confirmPassword-error').textContent = 'Passwords do not match.';
            isValid = false;
        }
    }
    return isValid;
}

// --- Core Authentication Handlers ---

function handleSignUp(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateForm(form)) return;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (users.some(user => user.email === email)) {
        document.getElementById('email-error').textContent = 'Account already exists with this email.';
        showToast('Registration failed: Email already in use.', 'bg-red-500');
        return;
    }

    const newUser = { 
        id: Date.now(), 
        name, 
        email, 
        password, 
        bio: 'A fresh recruit to the sewer network.',
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    showToast('Registration successful! Please log in.', 'bg-tmnt-green');
    renderLogin();
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        showToast(`Welcome, ${user.name.split(' ')[0]}! Logged in successfully.`, 'bg-tmnt-purple');
        // Simulate redirect to the main app dashboard
        authContentDiv.innerHTML = `<p class="text-center text-xl text-tmnt-green py-10">Welcome back, **${user.name}**!</p><p class="text-center opacity-75">You are now logged in. In a real app, you would be redirected to the main feed.</p>`;
    } else {
        showToast('Login failed: Invalid email or password.', 'bg-red-500');
    }
}

// --- View Renderers ---

function renderLogin() {
    authContentDiv.innerHTML = `
        <div class="max-w-md mx-auto">
            <h2 class="text-3xl font-semibold text-center mb-6 text-tmnt-purple">Ninja Login</h2>
            <form id="loginForm" class="card p-8 space-y-4" onsubmit="handleLogin(event)">
                <label class="block">
                    <span class="text-sm font-semibold block mb-1">Email Address:</span>
                    <input type="email" id="loginEmail" name="email" class="input-field" placeholder="example@tmnt.com" required>
                </label>
                <label class="block">
                    <span class="text-sm font-semibold block mb-1">Password:</span>
                    <input type="password" id="loginPassword" name="password" class="input-field" placeholder="Secret Password" required>
                </label>
                <button type="submit" class="animated-btn w-full px-4 py-3 rounded-lg font-bold text-lg mt-4">
                    Access Sewer Network
                </button>
                <p class="text-center text-sm opacity-75 pt-2">
                    Need access? <a href="#" onclick="renderRegistration()" class="text-tmnt-green font-semibold hover:underline transition-colors">Register here.</a>
                </p>
            </form>
        </div>
    `;
}

function renderRegistration() {
    authContentDiv.innerHTML = `
        <div class="max-w-lg mx-auto">
            <h2 class="text-3xl font-semibold text-center mb-6 text-tmnt-green">New Ninja Registration</h2>
            <form id="registrationForm" class="card p-8 space-y-4" onsubmit="handleSignUp(event)">
                <label class="block">
                    <span class="text-sm font-semibold block mb-1">Full Name *</span>
                    <input type="text" id="name" name="name" class="input-field" required>
                    <div id="name-error" class="error-message"></div>
                </label>
                <label class="block">
                    <span class="text-sm font-semibold block mb-1">Email Address *</span>
                    <input type="email" id="email" name="email" class="input-field" placeholder="example@tmnt.com" required>
                    <div id="email-error" class="error-message"></div>
                </label>
                <label class="block">
                    <span class="text-sm font-semibold block mb-1">Password * (Min 8 chars, 1 upper, 1 lower, 1 num)</span>
                    <input type="password" id="password" name="password" class="input-field" required>
                    <div id="password-error" class="error-message"></div>
                </label>
                <label class="block">
                    <span class="text-sm font-semibold block mb-1">Confirm Password *</span>
                    <input type="password" id="confirmPassword" name="confirmPassword" class="input-field" required>
                    <div id="confirmPassword-error" class="error-message"></div>
                </label>
                <button type="submit" class="animated-btn w-full px-4 py-3 rounded-lg font-bold text-lg mt-4 purple">
                    Sign Up
                </button>
                <p class="text-center text-sm opacity-75 pt-2">
                    Already registered? <a href="#" onclick="renderLogin()" class="text-tmnt-purple font-semibold hover:underline transition-colors">Go to Login.</a>
                </p>
            </form>
        </div>
    `;
}


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (currentUser) {
        authContentDiv.innerHTML = `<p class="text-center text-xl text-tmnt-green py-10">You are currently logged in as **${currentUser.name}**.</p>`;
    } else {
        // Default view is Login
        renderLogin();
    }
});