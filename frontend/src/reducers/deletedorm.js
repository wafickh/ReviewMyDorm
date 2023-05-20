export default (dormii = [], action) => {
    switch (action.type) {
        case 'Delete_Dorm':
            return action.payload;

        default:
            return dormii;
    }
}