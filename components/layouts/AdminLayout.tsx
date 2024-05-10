import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const AdminLayout: FC<Props> = ({ title, children }) => {

    const handleDelete = () => {
        Swal.fire({
            title: "Estas seguro?",
            text: "¡No podrás volver!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, salir!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await signOut();
                Swal.fire({
                    title: "Adios!",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            <main style={{
                margin: '50px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                <Box display="flex" flexDirection='row'>
                    <Typography sx={{ color: 'white' }} variant='h1' component='h1'>
                        {title}
                    </Typography>
                    <IconButton onClick={handleDelete}>
                        <Badge color="secondary">
                            <LogoutIcon sx={{ marginLeft: '15px', color: 'red' }} />
                        </Badge>
                    </IconButton>
                </Box>

                <Box className='animate__animated animate__fadeIn'>
                    {children}
                </Box>
            </main>
        </>
    )
}
