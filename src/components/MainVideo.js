import React, {useEffect,useState, useRef} from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import st from '../assets/st.mp4'
import { CiShare1 } from "react-icons/ci";


const Mainvideo = ({ onClick, isActive }) =>
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
                    Sơn Tùng MTP | Chúng ta của tương lai
                    </p>

                <hr></hr>
            </div>
            <div>
                <div className='font-roboto flex justify-between bg-white pb-[20px] px-[25px] pt-[10px]'>
                    <button className='text-[#3e3e3e] hover:decoration-1 hover:underline'
                        onClick={onClick}>
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
                <div className={`bg-white py-3 ] shadow-xl ${isActive?'rounded-b-[10px':'rounded-bl-[10px'}`} >
                    <p className='font-medium mx-[20px] rounded-[10px] my-[5px] px-[15px] py-[8px] bg-[#f2f2f2] '> 
                    20 tỷ views | Ngày 20, 3 năm 2024
                        <br/>
                        <p className='leading-6 mt-[5px] font-normal '>Đây là website do nhóm bq2d làm. Môn SE330<br/> 212520683 - Nguyễn Thành Đăng
                            <br/>21520714 - Trịnh Tấn Đạt 
                            <br/>21520421 - Nguyễn Trần Bảo Quốc
                            <br/>21520623 - Tạ Đức Bảo </p>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Mainvideo