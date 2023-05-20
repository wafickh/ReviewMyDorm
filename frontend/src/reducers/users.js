export default (users = [], action) => {
    switch (action.type) {
        case 'FETCH_Users':
            return action.payload;

        default:
            return users;
    }
}