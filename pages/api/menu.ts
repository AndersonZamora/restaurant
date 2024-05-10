import { NextApiRequest, NextApiResponse } from 'next';
import { Criollo } from '../../models';
import { db } from '../../database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            return getCriollos(req, res);

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
