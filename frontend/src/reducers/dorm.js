
export default (state = { DormData: [] }, action) => {
    switch (action.type) {
        case 'createDorm':
            return { ...state, DormData: [...state.DormData, action.payload] };
        default:
            return state;
    }
};
