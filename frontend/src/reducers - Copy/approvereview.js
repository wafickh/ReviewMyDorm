export default (reviewi = [], action) => {
    switch (action.type) {
        case 'Update_Review':
            return action.payload;

        default:
            return reviewi;
    }
}