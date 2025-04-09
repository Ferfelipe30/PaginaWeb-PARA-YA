document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', async (event)=>{
        event.preventDefault();

        //Capturar los datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //Validar los datos
        if (!name || !email || !password) {
            alert('Por favor, completa todos los campos');
            return;
        }

        //Crear el objeto de datos
        const userData = { name, email, password };

        try {
            //Enviar los datos al backend 
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('¡Usuario registrado con éxito!');
                form.reset();
            } else {
                alert('Error al registrar el usuario.');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('No se pudo conectar con el servidor.');
        }
    });
});