export const getJwt = () => {
    return localStorage.getItem('jwt');
}

export const destroyJwt = () => {
    localStorage.removeItem('jwt');
}