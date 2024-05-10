import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { Box, Button, Divider, FormControl, Grid, TextField } from '@mui/material';
import { IEntrada } from '../../../interface';
import { validations } from '../../../utils';

interface Props {
    handleEdit: (model: IEntrada) => void
    handleVisible: () => void;
    visible: boolean;
    model: IEntrada | undefined;
}

export const DialogEntradaEdit: FC<Props> = ({ handleEdit, handleVisible, visible, model }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IEntrada>({ defaultValues: { ...model } });
    const [loader, setLoader] = useState(false);

    const onHandleRegister = (model: IEntrada) => {
        setLoader(true);
        handleEdit(model);
    }

    useEffect(() => {
        reset({ ...model });
        setLoader(false);
    }, [visible]);

    return (
        <Dialog modal header='Registro' visible={visible} onHide={handleVisible} className='dialog-width'>
            <Box>
                <form onSubmit={handleSubmit(onHandleRegister)} noValidate autoComplete='off'>
                    <Grid container justifyContent='center'>
                        <Grid item sx={{ mt: 1 }} xs={12} sm={7} md={7}>
                            <FormControl fullWidth>
                                <TextField
                                    color='info'
                                    {...register('name', {
                                        required: 'Este campo es requido',
                                        validate: validations.isFullName,
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                        maxLength: { value: 40, message: 'Máximo 40 caracteres' }
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    label='Menú'
                                />
                            </FormControl>
                            <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <FormControl fullWidth>
                                <Button
                                    type='submit'
                                    size='large'
                                    variant='contained'
                                    color='primary'
                                    sx={{ display: loader ? 'none' : 'flex' }}
                                >
                                    Actualizar
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Box >
        </Dialog >
    )
}
