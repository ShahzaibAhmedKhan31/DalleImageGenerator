export const darkModeReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_DARK_MODE":
            return action.payload;
        default:
            return state;
    }
};

export const imageGalleryReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_GALLERY_IMAGES":
            return action.payload;
        default:
            return state;
    }
};
