import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { Box, Button, Divider, FormControl, Grid, TextField } from '@mui/material';
import { ICriollo } from '../../../interface';
import { validations } from '../../../utils';

interface Props {
    handleRegistro: (model: ICriollo) => void
    handleVisible: () => void;
    visible: boolean;
}

export const DialogMenu: FC<Props> = ({ handleRegistro, handleVisible, visible }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICriollo>();
    const [loader, setLoader] = useState(false);

    const onHandleRegister = (model: ICriollo) => {
        setLoader(true);
        handleRegistro(model);
    }

    useEffect(() => {
        reset();
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
                        <Grid item sx={{ mt: 1 }} xs={12} sm={7} md={7}>
                            <FormControl fullWidth>
                                <TextField
                                    {...register('price', {
                                        required: 'Este campo es requido',
                                        validate: validations.isPago,
                                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                        maxLength: { value: 3, message: 'Máximo 3 caracteres' }
                                    })}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    label='Precio'
                                />
                            </FormControl>
                            <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid item sx={{ mt: 1 }} xs={12} sm={7} md={7}>
                            <FormControl fullWidth>
                                <TextField
                                    {...register('description', {
                                        validate: validations.isDescription,
                                    })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    label='Descripción'
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
                                    Registrar
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Box >
        </Dialog >
    )
}
