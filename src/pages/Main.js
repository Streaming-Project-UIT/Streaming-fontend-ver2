import React, { useEffect, useState } from 'react';

const Main = () => {
  const [videoUrls, setVideoUrls] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [videoIds, setVideoIds] = useState([]);

  useEffect(() => {
    const fetchVideoIds = async () => {
      try {
        const response = await fetch('http://localhost:8080/video/listIdThumbnail');
        if (response.ok) {
          const ids = await response.json();
          setVideoIds(ids);
        } else {
          console.error('Failed to fetch video ids');
        }
      } catch (error) {
        console.error('Failed to fetch video ids:', error);
      }
    };

    fetchVideoIds();
  }, []);




  const generateVideoUrls = () => {
    return videoIds.map((id) => `http://localhost:8080/video/get/${id}`);
  };

  const handleClick = async (index) => {
    setVideoUrls(generateVideoUrls());
    setShowVideo(true);
    const apiUrl = "http://localhost:8080/video/getVideoIdFromThumbnailId/" + videoIds[index];
    // console.log(apiUrl);

    const response = await fetch(apiUrl);
    const result = await response.text();
    // console.log(result);
    const apiVideo = "http://localhost:8080/video/get/" + result;
    console.log(apiVideo);
  }

  return (
    <div>
      <h2 className="text-center mb-4">Thumbnail</h2>
      <div className="flex">
        {generateVideoUrls().map((url, index) => (
          <button
            key={index}
            className="border border-gray-500 flex-1 mr-4"
            onClick={() => handleClick(index)}
          >
            <img src={url} alt={`Thumbnail ${index}`} className="w-full" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Main;