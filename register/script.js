document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.rightSection form');
    const userNameInput = document.getElementById('userName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitButton = document.querySelector('.submitButton');

    // Regex patterns
    const nameRegex = /^[a-zA-Z\s]{2,}$/; // At least 2 letters/spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/; // Strong password

    // Validation functions
    const validateName = (name) => {
        if (!name) return { valid: false, message: 'Name is required' };
        if (name.length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
        if (!nameRegex.test(name)) return { valid: false, message: 'Name can only contain letters and spaces' };
        return { valid: true, message: '' };
    };

    const validateEmail = (email) => {
        if (!email) return { valid: false, message: 'Email is required' };
        if (!emailRegex.test(email)) return { valid: false, message: 'Enter a valid email address' };
        return { valid: true, message: '' };
    };

    const validatePassword = (password) => {
        if (!password) return { valid: false, message: 'Password is required', strength: null };
        if (password.length < 8) return { valid: false, message: 'Password must be at least 8 characters', strength: 'weak' };
        
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@$!%*?&]/.test(password);

        let strength = 'weak';
        let strong = 0;

        if (hasLower) strong++;
        if (hasUpper) strong++;
        if (hasNumber) strong++;
        if (hasSpecial) strong++;
        if (password.length >= 12) strong++;

        if (strong <= 2) {
            strength = 'weak';
            return { valid: false, message: 'Weak: Add uppercase, numbers, and special characters', strength };
        } else if (strong === 3 || strong === 4) {
            strength = 'medium';
            return { valid: true, message: 'Medium: Good, but could be stronger', strength };
        } else {
            strength = 'strong';
            return { valid: true, message: 'Strong: Excellent password!', strength };
        }
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return { valid: false, message: 'Please confirm your password' };
        if (password !== confirmPassword) return { valid: false, message: 'Passwords do not match' };
        return { valid: true, message: '' };
    };

    // Update validation messages
    const updateValidation = (input, messageElement, validation) => {
        messageElement.textContent = validation.message;
        messageElement.style.color = validation.valid ? '#2ecc71' : '#ff6b6b';
        
        if (validation.valid) {
            input.style.borderColor = '#2ecc71';
        } else if (input.value) {
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = 'transparent';
        }
    };

    // Password strength indicator
    const updatePasswordStrength = (strength) => {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');

        if (!strength) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            return;
        }

        const strengthConfig = {
            weak: { width: '33%', color: '#ff6b6b', text: 'Weak' },
            medium: { width: '66%', color: '#f39c12', text: 'Medium' },
            strong: { width: '100%', color: '#2ecc71', text: 'Strong' }
        };

        const config = strengthConfig[strength];
        strengthBar.style.width = config.width;
        strengthBar.style.backgroundColor = config.color;
        strengthText.textContent = config.text;
        strengthText.style.color = config.color;
    };

    const fields = [
        {
            input: userNameInput,
            messageElement: userNameInput.nextElementSibling,
            validateFn: validateName
        },
        {
            input: emailInput,
            messageElement: emailInput.nextElementSibling,
            validateFn: validateEmail
        },
        {
            input: passwordInput,
            messageElement: passwordInput.closest('.passwordWrapper').nextElementSibling,
            validateFn: validatePassword,
            strengthBar: document.querySelector('.strength-bar'),
            strengthText: document.querySelector('.strength-text')
        },
        {
            input: confirmPasswordInput,
            messageElement: confirmPasswordInput.closest('.passwordWrapper').nextElementSibling,
            validateFn: (val) => validateConfirmPassword(passwordInput.value, val)
        }
    ];

    // Check form validity
    const checkFormValidity = () => {
        const allValid = fields.every(field => {
            const validation = field.validateFn(field.input.value);
            return validation.valid;
        });

        submitButton.disabled = !allValid;
        submitButton.style.opacity = allValid ? '1' : '0.6';
        submitButton.style.cursor = allValid ? 'pointer' : 'not-allowed';
    };

    // Add event listeners to all fields
    fields.forEach(field => {
        field.input.addEventListener('input', function () {
            const validation = field.validateFn(this.value);
            updateValidation(this, field.messageElement, validation);
            
            // Update password strength if this is the password field
            if (field.strengthBar && field.strengthText) {
                updatePasswordStrength(validation.strength);
            }
            
            checkFormValidity();
        });
    });

    // Eye toggle functionality
    const eyeToggles = document.querySelectorAll('.eye-toggle');

    eyeToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            
            const wrapper = this.closest('.passwordWrapper');
            const input = wrapper.querySelector('input');
            const icon = this.querySelector('i');
            
            if (!input) return;

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            if (isPassword) {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.classList.add('eye-open');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.classList.remove('eye-open');
            }

            this.setAttribute('aria-pressed', String(isPassword));
        });
    });

    // Form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Final validation
        const nameVal = validateName(userNameInput.value);
        const emailVal = validateEmail(emailInput.value);
        const passwordVal = validatePassword(passwordInput.value);
        const confirmVal = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);

        if (nameVal.valid && emailVal.valid && passwordVal.valid && confirmVal.valid) {
            // Show loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<div class="spinner"></div>';
            
            // Simulate API call (2 seconds)
            setTimeout(() => {
                // Save user data
                localStorage.setItem('userName', userNameInput.value);
                localStorage.setItem('userEmail', emailInput.value);
                
                // Show success message
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Account Created!';
                submitButton.style.backgroundColor = '#2ecc71';
                
                // Redirect after 1.5 seconds
                setTimeout(() => {
                    // Change this URL to redirect to your desired page
                    window.location.href = '../home/index.html';
                }, 1500);
            }, 2000);
        }
    });
});


