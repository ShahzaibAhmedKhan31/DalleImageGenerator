import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/form.css';
import ImageGallery from './ImageGallery';
import MySpinner from './Spinner';
import SpeechToText from './SpeechToText';
import { useSelector } from 'react-redux';
import { GenerateImages } from '../api/utility';

function ImagePromptForm() {
  const promptRef = useRef(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [images, setImages] = useState([])
  const [transcript, setTranscript] = useState('');
  const [size, setSize ] = useState('256x256');
  const [number, setNumber ] = useState(1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const createdImages = [
    { src: 'https://img.freepik.com/premium-photo/happy-smiling-dog-white-background_884296-1387.jpg', alt: 'Image 1' },
    { src: 'https://img.freepik.com/premium-photo/happy-dog-isolated-white-background_398492-12305.jpg', alt: 'Image 2' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ4uqvUBOP6Siloz5znoisM4katcdC3LLGTQ&s', alt: 'Image 3' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHFcCylIOhzyXB_-rZ8NYQCyGVkee3Crm6qQ&s', alt: 'Image 4' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVmYDqb9jWCMYwcSkHa_vVct6FH4OLLxCy1g&s', alt: 'Image 5' },
    { src: 'https://img.freepik.com/premium-photo/happy-smiling-dog-studio-light-isolated-white-background_300636-8867.jpg', alt: 'Image 6' },
  ];

  const catImages = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZFSsI1bvuApZ2aOfbkSUulh9zs9Zy9HWUAQ&s', alt: 'Image 1'},
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAhpYHJnALX7kBgGBsQ5vPxI5yFYmJvkFLpQ&s', alt: 'Image 2'},
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8tM7bfHHJWu2ZBoJPf4fcaYAPzNg590MqQ&s', alt: 'Image 3'},
    { src: 'https://img.freepik.com/premium-photo/cat-with-blue-eyes_919857-982.jpg', alt: 'Image 4'},
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Z-wZZfUQUSPlKcTQyrK21gLq0gZKpx1c7A&s', alt: 'Image 5'},
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Wn4nJOm_AbM8WasG_yOnQYTxv5IappHrg&s', alt: 'Image 6'},

  ]

  var darkMode = useSelector(state => state.darkMode)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setShowSpinner(true)

    setImages([])

    const prompt = promptRef.current?.value;

    // try{
    //   setShowSpinner(true);
    //   const response = await GenerateImages({prompt, size, number})
    //   setShowSpinner(false);
    //   console.log(response.data.message);
    // }
    // catch(error) {
    //   console.log(error)
    // }

    if (!prompt) {
      console.error('Form values are not available');
      setShowSpinner(false);
      return;
    }
    // Function to add images one by one
    const addImagesOneByOne = (index) => {

      if (index < number) {
        // setImages((prevImages) => [...prevImages, createdImages[index]]);
        setTimeout(() => {
          if(prompt.includes("cat")){
            setImages((prevImages) => [...prevImages, catImages[index]]);
            addImagesOneByOne(index + 1);
          }
          else{
          setImages((prevImages) => [...prevImages, createdImages[index]]);
          addImagesOneByOne(index + 1);
          }
        }, 3000); // Adjust the interval as needed
      } else {
        setShowSpinner(false);
      }
    };

    // Start adding images
    addImagesOneByOne(0);
  };

  // Callback to handle recording state
  const handleRecordingChange = (isRecording) => {
    setIsSubmitDisabled(isRecording);
  };
  return (
    <>
      <div className='ImagePromptGenerator'>
        <h3 className='mb-4'>Describe Your Image</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="image-generator-prompt">
            <Form.Label className='font-weight-bold'>Enter your Prompt to Generate Image</Form.Label>
            <div className='d-flex mr-3'>
              <Form.Control className='prompt-text' type="text" placeholder="Eg: A smiling dog" name='prompt' ref={promptRef} value={transcript} onChange={(e) => setTranscript(e.target.value)} required />
              <SpeechToText onTranscriptChange={setTranscript} onRecordingChange={handleRecordingChange} />
            </div>
            <Form.Text style={{ color: darkMode ? '#adb5bd' : '#6c757d' }}>
              We'll fetch the image from OpenAI
            </Form.Text>
          </Form.Group>
          <Form.Group className='select pt-3 mb-3' controlId='image-generator-size'>
            <Form.Select aria-label="Default select example" placeholder="Select Size" required onChange={(e) => setSize(e.target.value)}>
              <option value="256x256">Small (256 x 256)</option>
              <option value="512x512">Medium (512 x 512)</option>
              <option value="1025x1024">Large (1024 x 1024)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='select'>
            <Form.Label>Enter number of images</Form.Label>
            <Form.Control className='mb-3'
              type="number" min="1" max="6" defaultValue="1" required onChange={(e) => setNumber(e.target.value)} />
            </Form.Group>
          <Button variant={darkMode ? "success" : "dark"} type="submit" disabled={isSubmitDisabled}>
            Generate
          </Button>
        </Form>
      </div>
      <div className='divider' style={{ backgroundColor: darkMode ? '#ffffff' : '#333333' }}></div>
      <div className='text-center'>
        <MySpinner display={showSpinner ? 'inline-block' : 'none'} />
      </div>
      <div className='mt-5'>
        <ImageGallery images={images} />
      </div>
    </>
  );
}

export default ImagePromptForm;