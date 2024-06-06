import React, { useEffect, useState, useRef } from 'react';
import NavbarApp from '../components/NavbarApp'
import thumnail from '../assets/images/thumnail.png'
import { IoIosCloudUpload } from "react-icons/io";  
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import st from '../assets/st.mp4'
import { CiShare1 } from "react-icons/ci";
import avar from '../assets/images/avar.jpg'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useSearchParams, useParams , useNavigate } from 'react-router-dom';
import VideoComponentRight from '../components/VideoComponentRight';


const Video = (props) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId');


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
  // useEffect(() => {
  //   const fetchVideoIds = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/video/getAllIds');
  //       if (response.ok) {
  //         const ids = await response.json();
  //         setVideoIds(ids);
  //         // console.log(videoIds);
  //       } else {
  //         console.error('Failed to fetch video ids');
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch video ids:', error);
  //     }
  //   };

  //   fetchVideoIds();
  // }, []);
  const videoRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState('auto');

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

  const generateVideoUrls = () => {
    return videoIds.map((id) => `http://localhost:8080/video/get/${id}`);
  };
  const videos = generateVideoUrls();

  return (
    <div>
      <NavbarApp/>
      <div className='h-[60px] '></div>
      <div className='px-[60px] py-[20px] flex'>
        <div className='w-8/12'>
            <div className=' h-auto bg-black'>
                <video src ={`http://localhost:8080/video/get/${videoId}`} controls  
                    autoPlay
                    muted
                    loop
                    style={{ height: '450px' }}
                    className=' pb-[15px] w-full h-full'
                    type="video/mp4"/>
            </div>
            <p className='font-medium font-roboto my-[10px]  bg-white  text-[24px]'>
                Sơn Tùng MTP | Chúng ta của tương lai
                </p>
            <hr></hr>
            <div className='font-roboto flex justify-between bg-white pb-[15px] px-[5px] pt-[10px]'>
                <div>
                  <div className='flex items-center gap-4'>
                    <img alt='avar' src={avar} className='rounded-[50%] size-[50px]'/>
                    <div>
                      <p className='text-[20px] '>Nguyễn Thành Đăng</p>
                      <p className='text-[#606060]'>Theo dõi: 4k</p>
                    </div>
                    <button className='flex  items-center ml-[15px] bg-[#d00b29] hover:bg-[#933240] text-white px-[15px] py-[8px]  rounded-[15px]'>
                                        Theo dõi                                    
                                    <MdOutlineAddCircleOutline className='ml-[10px] size-[22px]'/>
                                    </button>
                  </div>
                </div>
                <div className='flex '>
                    <button className='items-center h-[50px]  flex py-[8px] px-[20px] rounded-[20px] hover:bg-[#e5e5e5] bg-[#f3f3f3]'>
                        Thích
                        <AiOutlineLike className='size-[30px] ml-[5px]'/>
                    </button>
                    <button className='items-center h-[50px] ml-[20px] flex py-[8px] px-[20px] rounded-[20px] hover:bg-[#e5e5e5] bg-[#f3f3f3]'>
                        Chia sẻ
                        <CiShare1 className='size-[30px] ml-[5px]'/>
                    </button>        
                </div>
            </div>
            <div className=' bg-white'>
                <p className='font-medium rounded-[10px] my-[5px] px-[15px] py-[8px] bg-[#f2f2f2] '> 
                20 tỷ views | Ngày 20, 3 năm 2024
                    <br/>
                    <p className='leading-6 mt-[5px] font-normal'>Đây là website do nhóm bq2d làm. Môn SE330<br/> 212520683 - Nguyễn Thành Đăng
                        <br/>21520714 - Trịnh Tấn Đạt 
                        <br/>21520421 - Nguyễn Trần Bảo Quốc
                        <br/>21520623 - Tạ Đức Bảo </p>
                </p>
            </div>
        </div>



        <div className='w-1/3 flex flex-col'>
          {videos.slice(0).map((url, index) => (
              <VideoComponentRight img={url} videoId={videoIds[index]} />
          ))}
          {/* <VideoComponentRight img={thumnail}/>   
          <VideoComponentRight img={thumnail}/>   
          <VideoComponentRight img={thumnail}/>   
          <VideoComponentRight img={thumnail}/>   
          <VideoComponentRight img={thumnail}/>    */}
        </div>

      </div>
        {/* <div>
        {generateVideoUrls().map((url, index) => (
          <video key={index} controls>
            <source src={url} type="video/mp4" />
          </video>
        ))}
        </div> */}
    </div>
  );
};

export default Video;