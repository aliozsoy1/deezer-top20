const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API endpoint'i
app.get('/api/chart', async (req, res) => {
    try {
        const response = await axios.get('https://api.deezer.com/chart', {
            params: req.query
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Deezer API' });
    }
});

// React uygulamasının derlenmiş dosyalarını sunma
app.use(express.static(path.join(__dirname, 'client/build')));

// React uygulaması için tüm diğer istekleri ana sayfaya yönlendirme
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});