
export default (state = { ReviewData: [] }, action) => {
    switch (action.type) {
        case 'createReview':
            return { ...state, ReviewData: [...state.ReviewData, action.payload] };
        default:
            return state;
    }
};
