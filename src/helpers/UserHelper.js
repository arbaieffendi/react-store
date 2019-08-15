export const getUser = (jwt) => {
    let user = undefined;
    fetch('/auth/getUser', {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` } },
        ).then((response) => {
            console.log('getUser')
            response.json().then((data) => {
                user = data.authData.user;
            // this.setState({
            //     user: data.authData.user
            // });
            console.log(data.authData.user);
            console.log('finish cuy');
            console.log(user);
            return user;
        }).catch((error) => {
            return console.log(error);
        })
    });
}
