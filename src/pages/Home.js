import React, { useEffect, useState, useRef } from 'react';
import NavbarApp from '../components/NavbarApp';
import { IoMdMenu } from "react-icons/io";
import { LuMoveRight } from "react-icons/lu";
import VideoComponent from '../components/VideoComponent';


const Home = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState('auto');

  const [urlVideo, setUrlVideo] = useState()

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

  useEffect(() => {
    const video = videoRef.current;
    const resizeVideo = () => {
      if (video) {
        const videoWidth = video.clientWidth;
        const aspectRatio = video.videoWidth / video.videoHeight;
        setVideoHeight(`${videoWidth / aspectRatio}px`);
      }
    };
    window.addEventListener('resize', resizeVideo);
    resizeVideo();
    return () => {
      window.removeEventListener('resize', resizeVideo);
    };
  }, []);



  const generateThumbnailUrls = () => {
    return videoIds.map((id) => `http://localhost:8080/video/get/${id}`);
  };

  // const handleClick = async (index) => {
  //   setVideoUrls(generateThumbnailUrls());
  //   setShowVideo(true);
  //   const apiUrl = "http://localhost:8080/video/getVideoIdFromThumbnailId/" + videoIds[index];
  //   const response = await fetch(apiUrl);
  //   const result = await response.text();
  //   const apiVideo = "http://localhost:8080/video/get/" + result;
  //   setUrlVideo(apiVideo);
  //   console.log(apiVideo);
  // };

  const thumbnails = generateThumbnailUrls();

  return (
    <div>
      <NavbarApp />
      <div className='h-[60px]'></div>
      <div className='flex items-center my-3 pl-[20px] pt-[20px] w-3/5 text-black font-bold'>
        <IoMdMenu className='cursor-pointer size-[25px]' />
        <p className='ml-[10px] text-[#474747] text-[20px]'>Top video tiêu biểu</p>
      </div>

      <div className='flex relative mr-3'> 
        {thumbnails.slice(0, 4).map((url, index) => (
          // <div key={index} className='w-3/12 flex'>
          //   <div
          //     className='p-[15px] hover:bg-[#dddddd] bg-white mx-4 mt-4 drop-shadow-lg rounded-[10px] cursor-pointer'
          //     onClick={() => handleClick(index)}
          //   >
          //     <img className='rounded-[20px]' src={url} alt={`Thumbnail ${index}`} />
          //     <div className='font-roboto mr-2'>
          //       <p className='text-[18px] font-medium text-black mt-3 leading-6'>Video Title</p>
          //       <p className='text-[16px] mt-1'>Tên người chủ</p>
          //       <div className='flex text-[16px] justify-between'>
          //         <p>Lượt xem</p>
          //         <p>2 ngày trước</p>
          //       </div>
          //     </div>

          //   </div>
          // </div>
            // <div>
              <VideoComponent img={url} videoId={videoIds[index]} />

            // </div>
        ))}
        <LuMoveRight className='absolute right-[-12px] border border-[#474747] top-[35%] rounded-[50%] cursor-pointer p-2 bg-[#f0f4f9] size-[50px]' />
      </div>

      <div className='flex items-center mb-3 pl-[20px] pt-[20px] w-3/5 text-black font-bold'>
        <IoMdMenu className='cursor-pointer size-[25px]' />
        <p className='ml-[10px] text-[#474747] text-[20px]'>Dòng thời gian</p>
      </div>

      <div className='flex flex-wrap mr-3'>
        {thumbnails.slice(4).map((url, index) => (
            <VideoComponent img={url} videoId={videoIds[index]} />
        ))}
      </div>
    </div>
  );
};

export default Home;
