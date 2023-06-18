export default (dorms = [], action) => {
    switch (action.type) {
        case 'FETCH_Dorm':
            return action.payload;
        default:
            return dorms;
    }
};