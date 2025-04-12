const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const saveData = (fileName, data, res) => {
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({message: 'Error al leer el archivo'});
        }

        const records = fileData ? JSON.parse(fileData) : [];
        records.push(data);

        fs.writeFile(filePath, JSON.stringify(records, null, 2), (err) => {
            if (err) {
                return res.status(500).json({message: 'Error al guardar los datos'});
            }
            res.status(201).json({message: 'Registro exitoso'});
        });
    });
};

app.post('/register/user', (req, res) => {
    saveData('users.json', req.body, res);
});

app.post('/register/delivery', (req, res) => {
    saveData('delivery.json', req.body, res);
});

app.post('/register/company', (req, res) => {
    saveData('companies.json', req.body, res);
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});