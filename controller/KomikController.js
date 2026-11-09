const db = require('../models');
const komik = require('../models/komik');

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

async function createKomik(req, res) {
    const { judul, descroption, author } = req.body;
    try {
        const newKomik = await db.Komik.create({ 
            judul, descroption, author
         });
        res.status(201).json(newKomik);
    } catch (err) {
        console.error('Error creating komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { judul, descroption, author } = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        komik.judul = judul;
        komik.descroption = descroption;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error updating komik:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}
