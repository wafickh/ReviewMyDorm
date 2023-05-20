export default (dormss = [], action) => {
    switch (action.type) {
        case 'FETCH_DORMS':
            return action.payload;

        default:
            return dormss;
    }
}