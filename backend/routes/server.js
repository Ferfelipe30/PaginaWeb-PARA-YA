const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
    const userData = req.body;

    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({message: 'Error al leer el archivo'});
        }

        const users = data ? JSON.parse(data) : [];
        users.push(userData);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err)=>{
            if (err) {
                return res.status(500).json({message:'Error al guardar los datos'});
            }
            res.status(201).json({message: 'Usuario registrado con exito'});
        });
    });
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});