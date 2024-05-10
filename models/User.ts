import mongoose, { Schema, model, Model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
}, {
    timestamps: true
});

const Usuario: Model<{
    _id: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: string;
    updateAt?: string;
}> = mongoose.models.Usuario || model('Usuario', userSchema);

export default Usuario;
