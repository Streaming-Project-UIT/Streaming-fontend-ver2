import React from "react";
import {  useNavigate } from 'react-router-dom';
const VideoComponent = (props) =>
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
        <div className='w-3/12  flex'  onClick={()=>handleClick(props?.videoId)}>
                    <div className='p-[15px] hover:bg-[#dddddd] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className='  rounded-[20px]' src={props?.img} alt='other'/>
                        <div className='font-roboto  mr-2  '>
                            <p className='text-[18px] font-medium text-black mt-3 leading-6'>Sơn Tùng MTP | Chúng ta của tương lai</p>
                            <p className='text-[16px] mt-1'>Tên người chủ</p>
                            <div className='flex  text-[16px] justify-between'>
                                <p>Lượt xem</p>
                                <p>2 ngày trước</p>
                            </div>
                        </div>
                    </div>                 
                   
                </div>
    )
}
export default VideoComponent