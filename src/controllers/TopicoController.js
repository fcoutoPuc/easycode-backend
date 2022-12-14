const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { nome } = req.body;
        

        await connection('topico').insert({
            nome
        });
        return res.json({ nome });
    },

    async getAll(req, res) {
        const topico = await connection('topico').select('*');
        return res.json(topico);
    }
}