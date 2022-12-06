export const getJwt = () => {
    return localStorage.getItem('jwt');
}

export const destroyJwt = () => {
    localStorage.removeItem('jwt');
}

export const getUser = () => {
    return localStorage.getItem('user');
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const getCart = () => {
    return localStorage.getItem('cart');
}

export const clearCart = () => {
    localStorage.removeItem('cart');
}