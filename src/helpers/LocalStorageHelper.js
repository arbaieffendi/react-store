export const getJwt = () => {
    return localStorage.getItem('jwt');
}

export const destroyJwt = () => {
    localStorage.removeItem('jwt');
}

export const getUser = () => {
    return localStorage.getItem('user');
}