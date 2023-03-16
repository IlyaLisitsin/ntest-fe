const ShipModel = require('../model/Ship').Ship;

class ShipHelper {

    async addShip({ model }) {
        const newShip = new ShipModel({ model });
        await newShip.save();

        return newShip;
    }

    async getAll() {
        const ships = await ShipModel.find();

        return ships;

    }

    async edit({ ship }) {
        const shipToUpd = await ShipModel.findOne({
            _id: ship._id,
        });

        for (let k in ship) shipToUpd[k] = ship[k];

        await shipToUpd.save();

        return shipToUpd;
    }

    async delete({ id }) {

    }
}

module.exports = new ShipHelper();