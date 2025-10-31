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
        if (typeof showNotification === 'function') {
            showNotification('Form submitted successfully!', 'success');
        } else {
            alert('Form submitted successfully!');
        }
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

function showNotification(message, type = 'success') {
    const $notification = $(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 1050; display: none; max-width: 300px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);

    $('body').append($notification);
    $notification.fadeIn().delay(3000).fadeOut(500, function() {
        $(this).remove();
    });
}


$(document).ready(function() {

    $('[data-bs-toggle="tooltip"]').tooltip();

    $('.copy-btn').on('click', function(e) {
        e.preventDefault();

        const $btn = $(this);
        const textToCopy = $btn.siblings('.snippet-text').text().trim();

        const $tempInput = $('<textarea>').val(textToCopy).css({ position: 'absolute', left: '-9999px' });
        $('body').append($tempInput);
        $tempInput.select();

        try {
            document.execCommand('copy');

            const originalIcon = $btn.html();
            const originalTitle = $btn.attr('data-bs-original-title');

            const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.266 3.266a.75.75 0 0 1-1.07.039l-2.096-2.096a.75.75 0 1 1 1.06-1.06l1.547 1.547 2.723-2.723z"/></svg>`;

            $btn.html(checkIcon);
            $btn.attr('data-bs-original-title', 'Copied to clipboard!').tooltip('dispose').tooltip('show');

            setTimeout(() => {
                $btn.tooltip('hide').attr('data-bs-original-title', originalTitle).tooltip('dispose');
                $btn.attr('title', originalTitle);
                $btn.html(originalIcon);
                $btn.tooltip();
            }, 1500);

        } catch (err) {
            showNotification('Copy command failed.', 'danger');
        } finally {
            $tempInput.remove();
        }
    });

    const $window = $(window);
    const $lazyImages = $('.lazy-load-img');
    const threshold = 100;

    function lazyLoadImages() {
        const windowTop = $window.scrollTop();
        const windowBottom = windowTop + $window.height();

        $lazyImages.filter('[data-src]').each(function() {
            const $img = $(this);
            if ($img.offset().top < (windowBottom + threshold)) {
                const source = $img.data('src');
                $img.attr('src', source).removeAttr('data-src');
            }
        });

        if ($lazyImages.filter('[data-src]').length === 0) {
            $window.off('scroll resize', lazyLoadImages);
        }
    }

    lazyLoadImages();
    $window.on('scroll resize', lazyLoadImages);

});