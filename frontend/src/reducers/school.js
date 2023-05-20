export default (school = [], action) => {
    switch (action.type) {
        
        case 'FETCH_Name':
            return action.payload;
        default:
            return school;
    }
}