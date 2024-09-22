require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const cloudinary = require('cloudinary').v2;
// const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const port = process.env.PORT;

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// Configuration
cloudinary.config({ 
    cloud_name: 'dyfzlkaun', 
    api_key: '125513628854692', 
    api_secret: 'FJceNfWuGH-a5hqdKc8VPynpk6M' // Click 'View Credentials' below to copy your API secret
});

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// GET endpoint to fetch images from a specific folder
app.get('/images', async (req, res) => {
  const folderPath = req.query.folder;
  if (!folderPath) {
    return res.status(400).json({ error: 'Folder name is required' });
  }

  try {
    console.log(`Fetching images from folder: ${folderPath}`);
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Dalle-Image-Generator/',
      max_results: 500
    });

    if (result.resources.length === 0) {
      console.log('No images found in the specified folder.');
    } else {
      console.log(`Found ${result.resources.length} images.`);
    }

    res.json(result);
  }
  
  catch(error){
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Generate images through opeani
app.post("/generate", async (req , res) => {
  try{
    const {prompt, size, number} = req.body;
    console.log(prompt)
    console.log(size)
    console.log(number);

    // const response = await openai.images.generate({
    //   model: "dall-e-2",
    //   prompt: prompt,
    //   n: number,
    //   size: size,
    // });

    // images = response.data
    // return images

   return res.json({
      message: 'Image generated successfully',
    });
  }
  catch(error){
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
});

// POST endpoint to upload an image to Cloudinary from a URL
app.post('/upload', async (req, res) => {
  const { imageUrl, folder } = req.body;

  if (!imageUrl || !folder) {
    return res.status(400).json({ error: 'Image URL and folder name are required' });
  }

  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: folder
    });

    res.json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Route to delete an image
app.delete('/delete-image', async (req, res) => {
  const { public_id } = req.body;

  console.log(public_id)

  if (!public_id) {
    return res.status(400).json({ error: 'No public_id provided' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result !== 'ok') {
      throw new Error('Failed to delete image');
    }
    res.json({ message: 'Image deleted successfully', result });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})