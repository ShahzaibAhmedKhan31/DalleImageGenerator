export const darkModeAction = (darkMode) => {
    return (dispatch) => {
        dispatch({
            type: "SET_DARK_MODE",
            payload: darkMode
        });
    };
};

export const fetchGalleryImagesAction = (imageUrls) => {
    return (dispatch) => {
        dispatch({
            type: "SET_GALLERY_IMAGES",
            payload: imageUrls
        })
    }
}
