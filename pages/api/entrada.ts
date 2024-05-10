import { NextApiRequest, NextApiResponse } from 'next';
import { Entrada } from '../../models';
import { db } from '../../database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            return getEntras(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getEntras = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect();

        const entradas = await Entrada.find().select(' _id name').lean();

        await db.disconnect();

        res.status(200).json(entradas);

    } catch (error) {
        await db.disconnect();
        res.status(400).json({
            message: 'contacte con el admin'
        })
    }
}