import { NextApiRequest, NextApiResponse } from 'next';
import { Entrada } from '../../../models';
import { db } from '../../../database';
import { IEntrada } from '../../../interface';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            return getEntras(req, res);

        case 'PUT':
            return updateEntrada(req, res);

        case 'POST':
            return createEntrada(req, res);

        case 'DELETE':
            return deleteEntrada(req, res);

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

const deleteEntrada = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const { id } = req.query;

        await db.connect();

        const dbEntrada = await Entrada.findById(id);

        if (!dbEntrada) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una entrada con ese ID' });
        }

        await dbEntrada.deleteOne({ id });

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

const updateEntrada = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { name, _id } = req.body as IEntrada;

        await db.connect();

        const dbEntrada = await Entrada.findById(_id);

        if (!dbEntrada) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una entrada con ese ID' });
        }

        const dbEntradae = await Entrada.findOne({ name: name.toLowerCase() });

        if (dbEntradae) {
            if (`${dbEntradae?._id}` !== `${_id}`) {
                await db.disconnect();
                return res.status(400).json({ message: 'Entrada ya registrada' });
            }
        }

        dbEntrada.name = name.toLowerCase();
        await dbEntrada.save();

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

const createEntrada = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { name } = req.body as IEntrada;

        await db.connect();

        const dbEntrada = await Entrada.findOne({ name: name.toLowerCase() });

        if (dbEntrada) {
            await db.disconnect();
            return res.status(400).json({ message: 'Entrada ya registrada' });
        }

        const newEntrada = new Entrada({ name: name.toLowerCase() });
        await newEntrada.save();

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
