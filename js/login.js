        // Custom Message Box Function (Replacement for alert)
        function showCustomMessage(message) {
            const messageBox = document.getElementById('customMessageBox');
            const messageText = document.getElementById('customMessageText');
            const closeBtn = document.getElementById('customMessageCloseBtn');

            messageText.textContent = message;
            messageBox.classList.add('show');

            const closeHandler = () => {
                messageBox.classList.remove('show');
                closeBtn.removeEventListener('click', closeHandler);
                messageBox.removeEventListener('click', overlayClickHandler);
            };

            const overlayClickHandler = (event) => {
                if (event.target === messageBox) {
                    closeHandler();
                }
            };

            closeBtn.addEventListener('click', closeHandler);
            messageBox.addEventListener('click', overlayClickHandler);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const loginFormSection = document.getElementById('loginForm');
            const registerFormSection = document.getElementById('registerForm');
            const loginToggleLink = loginFormSection.querySelector('.toggle-form-link');
            const registerToggleLink = registerFormSection.querySelector('.toggle-form-link');

            // Toggle form visibility
            function toggleForms(targetFormId) {
                if (targetFormId === 'loginForm') {
                    loginFormSection.style.display = 'block';
                    registerFormSection.style.display = 'none';
                } else {
                    loginFormSection.style.display = 'none';
                    registerFormSection.style.display = 'block';
                }
            }

            loginToggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleForms(loginToggleLink.dataset.target);
            });

            registerToggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleForms(registerToggleLink.dataset.target);
            });

            // Handle Login Form Submission
            loginFormSection.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                const email = loginFormSection.querySelector('#loginEmail').value;
                const password = loginFormSection.querySelector('#loginPassword').value;

                // --- Lógica de redirección basada en credenciales ---
                if (email === 'admin@hotmail.com' && password === '1234') {
                    showCustomMessage('¡Inicio de sesión como administrador exitoso! Redirigiendo a la página de administración...');
                    setTimeout(() => {
                        window.location.href = 'administrador.html';
                    }, 1500); // Pequeño retraso para que el usuario vea el mensaje
                } else if (email === 'user@hotmail.com' && password === '1234') {
                    showCustomMessage('¡Inicio de sesión exitoso! Redirigiendo a la sección de hombres...');
                    setTimeout(() => {
                        window.location.href = 'hombres.html';
                    }, 1500); // Pequeño retraso para que el usuario vea el mensaje
                } else {
                    showCustomMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
                }
                // --- Fin de la lógica de redirección ---
            });

            // Handle Register Form Submission
            registerFormSection.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = registerFormSection.querySelector('#registerName').value;
                const email = registerFormSection.querySelector('#registerEmail').value;
                const password = registerFormSection.querySelector('#registerPassword').value;

                if (name && email && password) {
                    showCustomMessage(`Intentando registrar usuario: ${name} con correo: ${email}`);
                    // Aquí iría la lógica real de registro
                    setTimeout(() => {
                        showCustomMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
                        toggleForms('loginForm'); // Volver al formulario de login
                    }, 1500);
                } else {
                    showCustomMessage('Por favor, completa todos los campos para registrarte.');
                }
            });

            // Handle Social Login Buttons (Simulated)
            document.querySelectorAll('.social-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const provider = e.currentTarget.classList.contains('google') ? 'Google' : 'Facebook';
                    showCustomMessage(`Iniciando sesión con ${provider}... (Simulado)`);
                    // Aquí iría la lógica real de autenticación social
                    setTimeout(() => {
                        showCustomMessage(`¡Inicio de sesión con ${provider} exitoso!`);
                        // window.location.href = 'index.html'; // Redirigir a la página principal
                    }, 1500);
                });
            });

            // Handle Forgot Password Link (Simulated)
            document.querySelector('.forgot-password').addEventListener('click', (e) => {
                e.preventDefault();
                showCustomMessage('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico. (Simulado)');
            });
        });
