export default (dormi = [], action) => {
    switch (action.type) {
        case 'Update_Dorm':
            return action.payload;

        default:
            return dormi;
    }
}