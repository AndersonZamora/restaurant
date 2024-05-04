import Head from 'next/head';
import React, { FC } from 'react';

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl: string;
    children: React.ReactNode;
}

export const ChozaLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                <meta name="author" content='CinCout Technology - cincout.technology@gmail.com' />
                <meta name='Keywords' content='Comida Criolla, Menú Criollo, Menu Criollo, Choza norteña, Restaurante, Cevicheria' />
                <meta property="og:title" content={title} />
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='Comida Criolla - Choza norteña' />
                <meta property='site_name' content='Menú Criollo - Choza norteña' />
                <meta property="og:description" content={pageDescription} />
                {
                    imageFullUrl && (
                        <>
                            <meta name="og:image" content={`/images/${imageFullUrl}`} />
                            <meta property="og:image" content={`/images/${imageFullUrl}`} />
                        </>
                    )
                }
            </Head>
            {children}
        </>
    )
}
