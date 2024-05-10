import mongoose, { Schema, model, Model } from 'mongoose';
import { IEntrada } from '../interface';

const entradaSchema = new Schema({
    name: { type: String, require: true, default: '', unique: true },
}, {
    timestamps: true,
})

const Entrada: Model<IEntrada> = mongoose.models.Entrada || model('Entrada', entradaSchema);

export default Entrada;
