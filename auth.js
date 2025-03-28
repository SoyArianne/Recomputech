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

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'Este campo es requerido');
                } else {
                    removeError(input);
                    
                    // Email validation
                    if (input.type === 'email' && !isValidEmail(input.value)) {
                        isValid = false;
                        showError(input, 'Email inválido');
                    }
                    
                    // Password validation for register form
                    if (input.type === 'password' && form.id === 'registerForm') {
                        if (!isValidPassword(input.value)) {
                            isValid = false;
                            showError(input, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
                        }
                        
                        // Confirm password validation
                        if (input.id === 'confirmPassword') {
                            const password = form.querySelector('#password').value;
                            if (input.value !== password) {
                                isValid = false;
                                showError(input, 'Las contraseñas no coinciden');
                            }
                        }
                    }
                }
            });

            if (isValid) {
                // Here you would typically send the form data to your backend
                console.log('Form is valid, submitting...');
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                console.log('Form data:', data);
                
                // Simulate form submission
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> ¡Éxito!';
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                        // Redirect based on form type
                        if (form.id === 'loginForm') {
                            window.location.href = 'index.html';
                        } else if (form.id === 'registerForm') {
                            window.location.href = 'login.html';
                        } else if (form.id === 'forgotPasswordForm') {
                            showSuccess(form, 'Se han enviado las instrucciones a tu correo');
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