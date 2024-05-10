import validator from 'validator';

const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
};

const isValidPassword = (password: string): boolean => {
    return validator.isAlphanumeric(password, 'es-ES', { ignore: '._-#%&' })
};


const isValidPago = (password: string): boolean => {
    return validator.isNumeric(password, { no_symbols: false })
};

export const isValidFullName = (value: string): boolean => {
    return validator.isAlphanumeric(value, 'es-ES', { ignore: ' /.' })
};


export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email)
        ? undefined
        : 'El correo no parece ser válido';
}

export const isPassword = (password: string): string | undefined => {
    return isValidPassword(password)
        ? undefined
        : 'El password no es válido';
}

export const isFullName = (value: string): string | undefined => {
    return isValidFullName(value)
        ? undefined
        : 'Texto no válido';
}

export const isDescription = (value: string): string | undefined => {
    if (value === '') return undefined;
    return isValidFullName(value)
        ? undefined
        : 'Texto no válido';
}

export const isPago = (value: string): string | undefined => {
    return isValidPago(value.toString())
        ? undefined
        : 'Sólo números no válido';
}

