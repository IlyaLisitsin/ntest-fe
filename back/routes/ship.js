const express = require('express');
const router = express.Router();

const ShipHelper = require('../helper/ShipHelper');

router.get('/', async function(req, res) {
    try {
        const result = await ShipHelper.getAll();

        res.status(200).json(result);
    } catch (e) {
        if (e.isNonOperational) {
            res.status(e.httpCode).send(e.description);
        } else {
            console.log('GET SHIPS ERR:', e);
            res.status(403).send('action is not allowed');
        }
    }
});

router.post('/add', async function(req, res) {
    try {
        const result = await ShipHelper.addShip({ model: req.body.model });

        res.status(200).json(result);
    } catch (e) {
        if (e.isNonOperational) {
            res.status(e.httpCode).send(e.description);
        } else {
            console.log('ADD SHIP ERR:', e);
            res.status(403).send('action is not allowed');
        }
    }
});

router.post('/edit', async function(req, res) {
    try {
        const result = await ShipHelper.edit({ ship: req.body.ship });

        res.status(200).json(result);
    } catch (e) {
        if (e.isNonOperational) {
            res.status(e.httpCode).send(e.description);
        } else {
            console.log('EDIT SHIP ERR:', e);
            res.status(403).send('action is not allowed');
        }
    }
});

router.delete('/:id', async function(req, res) {
    try {
        const result = await ShipHelper.addShip({ id: req.params.id });

        res.status(200).json(result);
    } catch (e) {
        if (e.isNonOperational) {
            res.status(e.httpCode).send(e.description);
        } else {
            console.log('DELETE SHIP ERR:', e);
            res.status(403).send('action is not allowed');
        }
    }
});

module.exports = router;