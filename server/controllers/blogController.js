import blog from '../Schema/Blog.js'; // Assuming this is the path to your Blog model
import mongoose from 'mongoose';
// Controller function to add a new blog to the database
const addBlog = async (req, res) => {
  try {
    // Extracting necessary data from the request body
    const {title, content, tags } = req.body;

    // Creating a new blog instance
    const contentArr = content.split("\n");
    const newBlog = {
      title,
    //   banner,
    //   des,
      content:contentArr,
      tags,
      author:new mongoose.Types.ObjectId(req.user.id) // Assuming author is the ObjectId of the user who authored the blog
    };

    // Saving the new blog to the database
    const Blog = await blog.create(newBlog);


    

    res.status(201).json({ success: true, message: 'Blog added successfully', blog: Blog
 });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error('Error adding blog:', error);
    res.status(500).json({ success: false, message: 'Failed to add blog', error: error.message });
  }
};

export default addBlog;
