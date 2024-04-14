import React, { useState } from 'react';

const UploadVideo = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const userToken = localStorage.getItem('userToken');
    const [thumbnail, setThumbnail] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    const handleThumbnailChange = (event) => {
        const selectedThumbnail = event.target.files[0];
        setThumbnail(selectedThumbnail);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const formData = new FormData();
        // formData.append('title', title);
        // formData.append('description', description);
        formData.append('file', file);
        formData.append('userID', userToken);
        formData.append('thumbnail', thumbnail);
        const response = await fetch('http://localhost:8080/video/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Video uploaded!');
        } else {
            const errorText = await response.text(); // Lấy dữ liệu phản hồi dưới dạng văn bản
            // alert('Failed to upload video: ' + errorText);
            console.log('Failed to upload video: ' + errorText)
        }
    } catch (error) {
        console.error('Failed to upload video:', error);
        alert('Failed to upload video. An error occurred.');
    }
};

    return (
        <div className=" bg-[#f0f4f9]  flex justify-center items-center h-screen w-screen"> 
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
                <form onSubmit={handleSubmit} className="w-1/2">
                    <div className="mb-4">
                        <label htmlFor="file" className="block">Video File:</label>
                        <input type="file" id="file" accept=".mp4" onChange={handleFileChange} className="border border-gray-300 p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block">Thumbnail File:</label>
                        <input type="file" id="thumbnail" accept=".png, .jpg" onChange={handleThumbnailChange} className="border border-gray-300 p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block">Title:</label>
                        <input type="text" id="title" value={title} onChange={handleTitleChange} className="border border-gray-300 p-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block">Description:</label>
                        <textarea id="description" value={description} onChange={handleDescriptionChange} className="border border-gray-300 p-2" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadVideo;