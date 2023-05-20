export default (reviewii = [], action) => {
    switch (action.type) {
        case 'Delete_Review':
            return action.payload;

        default:
            return reviewii;
    }
}