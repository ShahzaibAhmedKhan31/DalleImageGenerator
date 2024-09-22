// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllUploadedImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`,{
        params: {
            folder: "Dalle-Image-Generator"
        }
    });
    return response.data.resources;
  } catch (error) {
    console.error('Error in getting all uploaded Images:', error);
    throw error;
  }
};


export const downloadImage = async (imageurl) => {
  try {
    const response = await axios.post(`${API_URL}/upload`,{
        "imageUrl": imageurl,
        "folder": "Dalle-Image-Generator"
    });
    return {statusCode: response.status, message: response.data.message};
  } catch (error) {
    console.error('Error in getting uploading image', error);
    return { message: error.message };
  }
};

export const deleteImage = async (publicId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-image`,{
      data: { 'public_id': publicId }  // Pass public_id here
    });
    console.log(response)
    return {statusCode: response.status, message: response.data.message};
  } catch (error) {
    console.error('Error in deleting image', error);
    return { message: error.message };
  }
};

export const GenerateImages = async ({prompt, size, number}) => {
  try {
    const response = await axios.post(`${API_URL}/generate`,{
    'prompt': prompt, "size": size, "number": number }  // Pass public_id here
    );
    return response
    // return {statusCode: response.status, message: response.data.message};
  } catch (error) {
    console.error('Error in deleting image', error);
    return { message: error.message };
  }
};
