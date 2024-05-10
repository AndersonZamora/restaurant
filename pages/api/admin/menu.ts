import { NextApiRequest, NextApiResponse } from 'next';
import { Criollo } from '../../../models';
import { db } from '../../../database';
import { ICriollo } from '../../../interface';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            return getCriollos(req, res);

        case 'PUT':
            return updateCriollo(req, res);

        case 'POST':
            return createCriollo(req, res);

        case 'DELETE':
            return deleteCriollo(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getCriollos = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect();

        const criollos = await Criollo.find().select('_id name price description').lean();

        await db.disconnect();

        res.status(200).json(criollos);

    } catch (error) {
        await db.disconnect();
        res.status(400).json({
            message: 'contacte con el admin'
        })
    }
}

const deleteCriollo = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const { id } = req.query;

        await db.connect();

        const dbCriollo = await Criollo.findById(id);

        if (!dbCriollo) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un criollo con ese ID' });
        }

        await dbCriollo.deleteOne({ id });

        const criollos = await Criollo.find().select('_id name price description').lean();

        await db.disconnect();

        res.status(200).json(criollos);

    } catch (error) {
        await db.disconnect();
        res.status(400).json({
            message: 'contacte con el admin'
        })
    }
}

const updateCriollo = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { name, price, description, _id } = req.body as ICriollo;

        await db.connect();

        const dbCriollo = await Criollo.findById(_id);

        if (!dbCriollo) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una habitación con ese ID' });
        }

        const dbCriolloe = await Criollo.findOne({ name });

        if (dbCriolloe) {
            if (`${dbCriolloe?._id}` !== `${_id}`) {
                await db.disconnect();
                return res.status(400).json({ message: 'Criollo ya registrada' });
            }
        }

        dbCriollo.name = name.toLowerCase();
        dbCriollo.price = price;
        dbCriollo.description = description.toLowerCase();

        await dbCriollo.save();

        const criollos = await Criollo.find().select('_id name price description').lean();

        await db.disconnect();

        res.status(200).json(criollos);

    } catch (error) {
        await db.disconnect();
        res.status(400).json({
            message: 'contacte con el admin'
        })
    }
}

const createCriollo = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { name, description, price } = req.body as ICriollo;

        await db.connect();

        const dbCriollo = await Criollo.findOne({ name: name.toLowerCase() });

        if (dbCriollo) {
            await db.disconnect();
            return res.status(400).json({ message: 'Menu ya registrado' });
        }

        const newCriollo = new Criollo({
            name: name.toLowerCase(),
            description: description.toLowerCase(),
            price
        });

        await newCriollo.save();

        const criollos = await Criollo.find().select('_id name price description').lean();

        await db.disconnect();

        res.status(200).json(criollos);

    } catch (error) {
        await db.disconnect();
        res.status(400).json({
            message: 'contacte con el admin'
        })
    }
}
