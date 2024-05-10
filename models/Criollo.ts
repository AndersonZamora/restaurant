import mongoose, { Schema, model, Model } from 'mongoose';
import { ICriollo } from '../interface';

const criolloSchema = new Schema({
    name: { type: String, require: true, default: '', unique: true },
    price: { type: String, require: true, default: '' },
    description: { type: String, default: '' },
}, {
    timestamps: true,
})

const Criollo: Model<ICriollo> = mongoose.models.Criollo || model('Criollo', criolloSchema);

export default Criollo;
