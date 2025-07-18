document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form validation and submission
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            let emailValue = '';

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else {
                    removeError(input);
                    
                    // Email validation
                    if (input.type === 'email') {
                        emailValue = input.value.trim();
                        if (!isValidEmail(input.value)) {
                            isValid = false;
                            showError(input, 'Invalid email');
                        }
                    }
                    
                    // Password validation for register form
                    if (input.type === 'password' && form.id === 'registerForm') {
                        if (!isValidPassword(input.value)) {
                            isValid = false;
                            showError(input, 'Password must be at least 8 characters, one uppercase, one lowercase and one number');
                        }
                        
                        // Confirm password validation
                        if (input.id === 'confirmPassword' || input.id === 'techConfirmPassword') {
                            const password = form.querySelector('#password') ? form.querySelector('#password').value : form.querySelector('#techPassword').value;
                            if (input.value !== password) {
                                isValid = false;
                                showError(input, 'Passwords do not match');
                            }
                        }
                    }
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                        // Redirection logic
                        if (form.id === 'loginForm') {
                            // Detect user type for login
                            let userType = localStorage.getItem('userType');
                            if (!userType) userType = 'regular'; // fallback
                            if (userType === 'technician') {
                                window.location.href = 'dashboard-technician.html';
                            } else {
                                window.location.href = 'dashboard-user.html';
                            }
                        } else if (form.id === 'registerForm') {
                            // Simulate: if email already exists, redirect to login
                            // For demo, if email is 'test@exists.com', simulate existing user
                            if (emailValue === 'test@exists.com') {
                                window.location.href = 'login.html';
                                return;
                            }
                            // Detect user type for register
                            let userType = 'regular';
                            if (document.getElementById('technicianUser') && document.getElementById('technicianUser').checked) {
                                userType = 'technician';
                            }
                            localStorage.setItem('userType', userType);
                            if (userType === 'technician') {
                                window.location.href = 'dashboard-technician.html';
                            } else {
                                window.location.href = 'dashboard-user.html';
                            }
                        } else if (form.id === 'forgotPasswordForm') {
                            showSuccess(form, 'Instructions have been sent to your email');
                        }
                    }, 1000);
                }, 2000);
            }
        });
    });
});

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1 small';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('is-invalid');
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('is-invalid');
}

function showSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Theme handling
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme); 