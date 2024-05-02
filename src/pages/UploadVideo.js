import React, { useState } from 'react';
import NavbarApp from '../component/NavbarApp'


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
        <div className=" bg-[#f0f4f9] h-screen "> 
            <NavbarApp/>
            <div className='h-[80px]'></div>
            <div className=' flex justify-center items-center  w-screen'>
                <div className="flex flex-col  w-[500px] bg-white p-5 items-center rounded-[15px] drop-shadow-xl">
                    <h1 className="text-[30px] font-bold mb-4">Đăng tải video</h1>
                    <form onSubmit={handleSubmit} className="px-4 w-full">
                        <div className="mb-4 w-full ">
                            <label htmlFor="file" className="block">Video:</label>
                            <input type="file" id="file" accept=".mp4" onChange={handleFileChange} 
                            className="border w-full rounded-[10px] border-gray-300 p-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="file" className="block">Ảnh thu nhỏ:</label>
                            <input type="file" id="thumbnail" accept=".png, .jpg" onChange={handleThumbnailChange} 
                            className="border  w-full rounded-[10px] border-gray-300 p-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block">Tiêu đề:</label>
                            <input type="text" id="title" value={title} onChange={handleTitleChange} 
                            className="border  w-full rounded-[10px] border-gray-300 p-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block">Mô tả:</label>
                            <textarea id="description" value={description} onChange={handleDescriptionChange} 
                            className="border w-full rounded-[10px] h-[150px] border-gray-300 p-2" />
                        </div>
                        <button type="submit" className="bg-blue-500  text-white py-2 px-4
                            grow focus:border-[#595959] focus:border-[1px] hover:bg-[#687fe6] rounded-[20px]  w-[200px] h-[45px]
                            border-[1px] border-[#ccc] outline-none font-bold
                        ">Tải lên</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default UploadVideo;