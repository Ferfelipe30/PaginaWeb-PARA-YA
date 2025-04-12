document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const deliveryForm = document.getElementById('deliveryForm');
    const companyForm = document.getElementById('companyForm');
    const recordList = document.getElementById('recordList');

    const handleFormSubmit = async (form, url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('¡Registro exitoso!');
                form.reset();
                addRecordToList(data);
            } else {
                alert('Error al registrar.');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('No se pudo conectar con el servidor.');
        }
    };

    const addRecordToList = (data) => {
        const listItem = document.createElement('li');
        listItem.textContent = JSON.stringify(data);
        recordList.appendChild(listItem);
    };

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            password: document.getElementById('userPassword').value,
        };
        handleFormSubmit(userForm, 'http://localhost:3000/register/user', data);
    });

    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('deliveryName').value,
            phone: document.getElementById('deliveryPhone').value,
            vehicle: document.getElementById('deliveryVehicle').value,
        };
        handleFormSubmit(deliveryForm, 'http://localhost:3000/register/delivery', data);
    });

    companyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('companyName').value,
            email: document.getElementById('companyEmail').value,
            address: document.getElementById('companyPhone').value,
        };
        handleFormSubmit(companyForm, 'http://localhost:3000/register/company', data);
    });
});