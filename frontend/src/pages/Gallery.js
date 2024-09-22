import React, { useState, useEffect } from 'react';
import '../css/gallery.css';
import { getAllUploadedImages, deleteImage } from '../api/utility';
import MySpinner from '../components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../components/Toast';
import { toastOptions } from '../helper/helper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../states/index';

const Gallery = () => {
  const dispatch = useDispatch();
  // const [images, setImages] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [loading, setLoading] = useState({});
  const [deleteTrigger, setDeleteTrigger] = useState(false); // State to trigger re-fetch

  const darkMode = useSelector(state => state.darkMode)
  const images = useSelector(state => state.images)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setShowSpinner(true);
        const response = await getAllUploadedImages();
        const imageUrls = response.map(resource => ({
          src: resource.url,
          public_id: resource.public_id,
          alt: resource.display_name
        }));
        dispatch(actionCreators.fetchGalleryImagesAction(imageUrls)); // Corrected typo
        setShowSpinner(false);
      } catch (error) {
        console.error('Error:', error);
        setShowSpinner(false); // Ensure spinner is hidden on error
        toast.error(error.message, toastOptions)
      }
    };

    fetchImages();
  }, [dispatch, deleteTrigger]); // Use deleteTrigger as a dependency

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  // Calculate the number of pages
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Get the images for the current page
  const currentImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteImage = async (index, publicId) => {
    console.log(publicId);
    console.log(index);
    setLoading(prevLoading => ({ ...prevLoading, [index]: true }));

    const response = await deleteImage(publicId);
    if (response.statusCode === 200) {
      setLoading(prevLoading => ({ ...prevLoading, [index]: false }));
      toast.success(response.message, toastOptions);
      setDeleteTrigger(prev => !prev); // Toggle the deleteTrigger state
    } else {
      setLoading(prevLoading => ({ ...prevLoading, [index]: false }));
      toast.error(response.message, toastOptions);
    }
  };

  const imageStyle = {
    width: '350px',
    height: '350px',
    objectFit: 'cover', // Ensures the image covers the area without distortion
  };

  return (
    <div>
      <h1 className='text-center mb-5'>My Gallery</h1>
      <div className='divider mb-5' style={{ backgroundColor: darkMode ? '#ffffff' : '#333333' }}></div>
      <div className="gallery">
        <MySpinner display={showSpinner ? 'inline-block' : 'none'} />
        {!showSpinner && currentImages.length > 0 ? (
          currentImages.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.src} alt={image.alt} style={imageStyle} />
            {loading[index] ? (
              <div style={{ position: 'absolute', top: '50%', left: '30%' }}>
                <MySpinner display="inline-block" />
              </div>
            ) : (
              <button className="delete-button" onClick={() => { handleDeleteImage(index, image.public_id) }}><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M3 6h18v2H3V6z" />
              <path
                fill-rule="evenodd"
                d="M5 6v14a2 2 0 002 2h10a2 2 0 002-2V6H5zm3 4a1 1 0 012 0v8a1 1 0 11-2 0v-8zm5-1a1 1 0 00-1 1v8a1 1 0 102 0v-8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
              <path d="M9 4h6v2H9V4z" />
            </svg></button>
            )}
          </div>
        ))
      ):(
        !showSpinner && (
          <div>
            <h3 className='font-sans-serif'>No Images Found in Gallery</h3>
            <p className='text-center text-muted'>Please download some images to view.....</p>
          </div>
        )
      )}
      </div>
      <div className="pagination mb-5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>
        <Toast />
      </div>
    </div>
  );
};

export default Gallery;
