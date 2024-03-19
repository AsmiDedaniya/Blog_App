import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog
    = () => {
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [tags, setTags] = useState([]);
        const [tagInput, setTagInput] = useState('');
        const navigate = useNavigate();
        const handleTagInputChange = (e) => {
            setTagInput(e.target.value);
        };

        const handleTagRemove = (tagToRemove) => {
            setTags(tags.filter(tag => tag !== tagToRemove));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            // Do something with the form data (e.g., submit to a server)
            console.log({ title, content, tags });
            // Reset form fields
            setTitle('');
            setContent('');
            setTags([]);
            const blog = await axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/blog/add', {
            title,
            content,
            tags
            }
            )
            navigate('/');
        };

        return (
            <form className="max-w-lg mx-auto mt-8">
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-semibold">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-2 font-semibold">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        rows={5}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block mb-2 font-semibold">Tags</label>
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                            <div key={index} className="mr-2 mb-2 bg-black text-white px-3 py-1 rounded-md flex items-center">
                                {tag}
                                <button type="button" onClick={() => handleTagRemove(tag)} className="ml-2 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="tags"
                            placeholder="Enter tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                        <button
                            className="ml-2 mb-2 bg-black text-white px-3 py-1 rounded-md flex items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                setTags([...tags, tagInput]);
                                setTagInput("");
                            }}
                        >
                            Add
                        </button>
                    </div>


                </div>
                <button
                    onClick={handleSubmit}
                    className=" bg-black text-white px-4 py-2 rounded-md "
                >
                    Submit
                </button>
            </form>
        );
    };

export default AddBlog;
