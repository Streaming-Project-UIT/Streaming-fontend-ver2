import React from "react";
import {  useNavigate } from 'react-router-dom';
const VideoComponentRight = (props) =>
{
    const navigate = useNavigate()
    const handleClick = async ( videoId) => {
        const apiUrl = "http://localhost:8080/video/getVideoIdFromThumbnailId/" + videoId;
        const response = await fetch(apiUrl);
        const result = await response.text();
        const apiVideo = "http://localhost:8080/video/get/" + result;
        console.log(apiVideo)
        navigate(`/video?videoId=${result}`)
      };

    return(
        <div className='pl-[20px] my-[10px] flex cursor-pointer peer peer-focus:bg-[#f2f2f2]' onClick={()=>handleClick(props?.videoId)}>

            
            <img className='w-1/2 rounded-[20px]' src={props?.img} alt='other'/>
            <div className='font-roboto ml-[20px] mr-2  '>
                <p className='text-[16px] font-medium text-black'>Sơn Tùng MTP | Chúng ta của tương lai</p>
                <p className='text-[16px]'>Tên người chủ</p>
                <div className='flex justify-between text-[12px]'>
                    <p>Lượt xem</p>
                    <p>2 ngày trước</p>
                </div>
            </div>
        </div>
    )
}
export default VideoComponentRight