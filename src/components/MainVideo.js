import React, {useEffect,useState, useRef} from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import st from '../assets/st.mp4'
import { CiShare1 } from "react-icons/ci";
import axios from "axios";

const Mainvideo = (props) =>
{
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
    useEffect(()=>
    {
        
    },[])
    function formatMongoTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();
      
        return `Ngày ${day}, ${month} năm ${year}`;
      }


    return(
        <div className=''>
            <div className='flex justify-center'>
                <div className=' h-auto bg-white'>
                    <video src ={st} controls  
                        autoPlay
                        muted
                        loop
                        ref={videoRef}
                        style={{ height: videoHeight }}
                        className='p-[10px] pb-[15px] w-full h-full'
                        type="video/mp4"/>
                </div>
            </div>
            {/* <div className='flex justify-center w-full'> */}
            <div>
                <p className='font-medium font-roboto  bg-white pl-[20px] text-[24px]'>
                    {props?.title}
                    </p>

                <hr></hr>
            </div>
            <div>
                <div className='font-roboto flex justify-between bg-white pb-[20px] px-[25px] pt-[10px]'>
                    <button className='text-[#3e3e3e] hover:decoration-1 hover:underline'
                        onClick={props?.onClick}>
                        Xem bình luận</button>
                    <div className='flex '>
                        <button className='items-center  flex py-[8px] px-[20px] rounded-[20px] hover:bg-[#e5e5e5] bg-[#f3f3f3]'>
                            Thích
                            <AiOutlineLike className='size-[30px] ml-[5px]'/>
                        </button>
                        <button className='items-center ml-[20px] flex py-[8px] px-[20px] rounded-[20px] hover:bg-[#e5e5e5] bg-[#f3f3f3]'>
                            Chia sẻ
                            <CiShare1 className='size-[30px] ml-[5px]'/>
                        </button>        
                    </div>
                </div>
            </div>
            <div>
                <div className={`bg-white py-3 ] shadow-xl ${props?.isActive?'rounded-b-[10px':'rounded-bl-[10px'}`} >
                    <p className='font-medium mx-[20px] rounded-[10px] my-[5px] px-[15px] py-[8px] bg-[#f2f2f2] '> 
                     {props?.view} lượt xem | {formatMongoTimestamp(props?.timestamp)}
                        <br/>
                        <p className='leading-6 mt-[5px] font-normal '>
                        {props?.descript} </p>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Mainvideo