import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/imageGallery.css';
import { downloadImage } from '../api/utility';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './Toast';
import { toastOptions } from '../helper/helper';
import MySpinner from './Spinner'; // Import your spinner component

const ImageGallery = ({ images }) => {
  const imageStyle = {
    width: '350px',
    height: '350px',
    objectFit: 'cover', // Ensures the image covers the area without distortion
  };

  const [loading, setLoading] = useState({});

  const handleImageClick = async (index, image) => {
    console.log('Image clicked:', image.src);
    setLoading(prevLoading => ({ ...prevLoading, [index]: true }));

    const response = await downloadImage(image.src);
    if (response.statusCode === 200) {
      setLoading(prevLoading => ({ ...prevLoading, [index]: false }));
      toast.success(response.message, toastOptions);
    } else {
      setLoading(prevLoading => ({ ...prevLoading, [index]: false }));
      toast.error(response.message, toastOptions);
    }
  };

  return (
    <>
      <Container>
        <Row>
          {images.map((image, index) => (
            <Col xs={12} md={4} key={index} className="mb-4">
              <div className="image-container">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={imageStyle}
                  className="img-fluid gallery-image"
                  onClick={() => !loading[index] && handleImageClick(index, image)}
                  disabled={loading[index]}
                />
                {loading[index] ? (
                  <div style={{ position: 'absolute', top: '50%', left: '35%' }}>
                    <MySpinner display="inline-block" />
                  </div>
                ) : (
                  <button className="download-button" onClick={() => handleImageClick(index, image)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9v3.6c0 .248.202.45.45.45h14.2c.248 0 .45-.202.45-.45V9.9a.5.5 0 0 0-1 0v3.1H1V9.9a.5.5 0 0 0-1 0z" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 1 0-.708-.708L8 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                    Download
                    </button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div>
        <Toast />
      </div>
    </>
  );
};

export default ImageGallery;
