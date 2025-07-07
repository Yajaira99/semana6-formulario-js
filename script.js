const form = document.getElementById('registroForm');
const btnEnviar = document.getElementById('btnEnviar');

const campos = {
  nombre: {
    el: document.getElementById('nombre'),
    valid: false,
    validate() {
      const val = this.el.value.trim();
      if (val.length < 3) {
        showMessage(this, 'El nombre debe tener al menos 3 caracteres', false);
        this.valid = false;
      } else {
        showMessage(this, 'Nombre válido', true);
        this.valid = true;
      }
    }
  },
  email: {
    el: document.getElementById('email'),
    valid: false,
    validate() {
      const val = this.el.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(val)) {
        showMessage(this, 'Correo electrónico inválido', false);
        this.valid = false;
      } else {
        showMessage(this, 'Correo válido', true);
        this.valid = true;
      }
    }
  },
  password: {
    el: document.getElementById('password'),
    valid: false,
    validate() {
      const val = this.el.value;
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
      if (!regex.test(val)) {
        showMessage(this, 'Al menos 8 caracteres, un número y un símbolo', false);
        this.valid = false;
      } else {
        showMessage(this, 'Contraseña válida', true);
        this.valid = true;
      }
    }
  },
  confirmPassword: {
    el: document.getElementById('confirmPassword'),
    valid: false,
    validate() {
      const val = this.el.value;
      const passVal = campos.password.el.value;
      if (val !== passVal || val === '') {
        showMessage(this, 'Las contraseñas no coinciden', false);
        this.valid = false;
      } else {
        showMessage(this, 'Las contraseñas coinciden', true);
        this.valid = true;
      }
    }
  },
  edad: {
    el: document.getElementById('edad'),
    valid: false,
    validate() {
      const val = parseInt(this.el.value);
      if (isNaN(val) || val < 18) {
        showMessage(this, 'Debes tener al menos 18 años', false);
        this.valid = false;
      } else {
        showMessage(this, 'Edad válida', true);
        this.valid = true;
      }
    }
  }
};

// Mostrar mensaje
function showMessage(campo, mensaje, esValido) {
  const input = campo.el;
  const small = input.nextElementSibling;

  input.classList.remove('valid', 'invalid');
  small.classList.remove('error', 'success');

  if (esValido) {
    input.classList.add('valid');
    small.textContent = mensaje;
    small.classList.add('success');
  } else {
    input.classList.add('invalid');
    small.textContent = mensaje;
    small.classList.add('error');
  }

  validarTodo();
}

// Validar todos los campos y habilitar botón
function validarTodo() {
  const todosValidos = Object.values(campos).every(c => c.valid);
  btnEnviar.disabled = !todosValidos;
}

// Agregar eventos a cada campo
Object.entries(campos).forEach(([key, campo]) => {
  campo.el.addEventListener('input', () => {
    campo.validate();
    if (key === 'password') {
      campos.confirmPassword.validate();
    }
  });

  // Para campo edad, agregar también evento 'change'
  if (key === 'edad') {
    campo.el.addEventListener('change', () => {
      campo.validate();
    });
  }
});

// Validar al cargar la página
window.addEventListener('load', () => {
  Object.values(campos).forEach(c => c.validate());
});

// Enviar formulario
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!btnEnviar.disabled) {
    alert('¡Formulario enviado exitosamente!');
    form.reset();
    Object.values(campos).forEach(campo => {
      campo.valid = false;
      campo.el.classList.remove('valid', 'invalid');
      campo.el.nextElementSibling.textContent = '';
    });
    btnEnviar.disabled = true;
  }
});
