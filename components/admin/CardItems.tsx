import { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

type Props = {
    title: string;
    color: string;
    icon: JSX.Element;
}

export const CardItems: FC<Props> = ({ title, color, icon }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                backgroundColor: `${color}`,
                color: '#f5f5f5'
            }}
        >
            <CardContent sx={{ width: '100%' }}>
                <Typography>{title}</Typography>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}>
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
