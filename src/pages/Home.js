import React, { useEffect, useState, useRef } from 'react';
import NavbarApp from '../components/NavbarApp';
import { IoMdMenu } from "react-icons/io";
import { LuMoveRight } from "react-icons/lu";
import VideoComponent from '../components/VideoComponent';
import Loading from '../components/Loading';

const Home = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [values, setValueIds] = useState();

  const [videoUrls, setVideoUrls] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState('auto');

  const [urlVideo, setUrlVideo] = useState()

  // useEffect(() => {
  //   const fetchVideoIds = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/video/listIdThumbnail')
  //       if (response.ok) {
  //         const ids = await response.json();
  //         setVideoIds(ids);
  //       } else {
  //         console.error('Failed to fetch video ids');
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch video ids:', error);
  //     }
  //   };

  //   fetchVideoIds();
  // }, []);
  useEffect(() => {
    const fetchVideoIds = async () => {
      try {
        const response = await fetch('http://localhost:8080/video/listIdThumbnail');
        if (!response.ok) {
          throw new Error('Failed to fetch video ids');
        }
        const ids = await response.json();
        setVideoIds(ids);
        const fetchDataPromises = ids.map(async id => {
          console.log(id)
          const response = await fetch(`http://localhost:8080/video/getDetails/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for id: ${id}`);
          }
          return response.json();
        });
        const data = await Promise.all(fetchDataPromises);
        setValueIds(data);
      } catch (error) {
        console.error('Failed to fetch video ids or data:', error);
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
    return videoIds.map((id) => {
      return  `http://localhost:8080/video/get/${id}`
      });
  };
  

  const thumbnails =  generateThumbnailUrls();

  

  return (
    <div>
      <NavbarApp />
      <div className='h-[60px]'></div>
      <div className='flex items-center my-3 pl-[20px] pt-[20px] w-3/5 text-black font-bold'>
        <IoMdMenu className='cursor-pointer size-[25px]' />
        <p className='ml-[10px] text-[#474747] text-[20px]'>Top video tiêu biểu</p>
      </div>

      <div className='flex relative mr-3'> 
      {(values && values.length > 0 && thumbnails && thumbnails.length > 0) ? (
          thumbnails.slice(0, 4).map((url, index) => (
            <VideoComponent
              key={videoIds[index]}
              img={url}
              title={values[index]?.metadata?.videoName}
              username={values[index]?.metadata?.userName}
              timestamp={values[index]?.metadata?.timestamp}
              view={values[index]?.views}
              videoId={videoIds[index]}
            />
          ))
        ) : (
          <Loading/>
        )}
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
