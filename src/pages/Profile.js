import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../component/NavbarApp';
import bgWall from '../assets/images/bgWall.jpg'
import avar from '../assets/images/avar.jpg'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import thumnail from '../assets/images/thumnail.png'
import { IoIosCloudUpload } from "react-icons/io";  
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import st from '../assets/st.mp4'
import { CiShare1 } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";

const Profile = () => {
    const userToken = localStorage.getItem('userToken');
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [subcribe, setSubcribe] = useState('');
    const [isMe, setIsMe] = useState(false);
    const [isFocusFilter, setFocused] = useState(false);
    const handleChooseFilter = () =>
    {
        setFocused(!isFocusFilter);
    }
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/listUserbyId/${userToken}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAvatar(data.avatar); // Lưu trữ chuỗi Base64 của avatar
                    setUsername(data.username);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setSubcribe(data.subcribe);
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, []);
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
    

    const fn = 'Nguyễn Thành'
    const ln = 'Đăng'
    const handleSubmit = async (event) => {};

    return (
        <div className="bg-[#f0f4f9]  relative ">
            <Navbar />
            <div className='h-[60px]'></div>
            <img src={bgWall} alt='Bg-persional' className=' w-full h-[260px] object-cover' />
            <form className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-1 " onSubmit={handleSubmit}>
                {/* {avatar && 
                //<img src={`data:image/jpeg;base64, ${avatar}`} alt="Avatar" className="w-20 h-20 rounded-full mb-4" />} */}
                
                <img src={avar} alt="Avatar" className="z-10 shadow-xl border-[5px] cursor-pointer border-white top-[150px] left-1/2 
                                transform -translate-x-1/2 absolute w-[250px] h-[250px] rounded-full mb-4" />

                <div className=' justify-center flex font-light text-[18px] '>
                        <div>
                            <p className=" mt-[60px] text-[30px] font-bold w-auto mb-2 size-[25px]">{fn +" "+ ln}</p>
                            <p className="mb-2 mt-[20px]  ">  Username: dangnguyen03  </p>
                            <p className="mb-2 mt-[0px]  ">Email: 21520683@gm.uit.edu.vn</p>

                            <div className='flex text-[20px] items-center font-Oswald font-medium mt-[10px] justify-between'>
                                <p className=" ">Lượt theo dõi: 20</p>
                                {!isMe?
                                    <button className='flex  items-center bg-[#d00b29] hover:bg-[#933240] text-white px-[15px] py-[8px]  rounded-[5px]'>
                                        Theo dõi                                    
                                    <MdOutlineAddCircleOutline className='ml-[10px] size-[22px]'/>
                                    </button>:''
                                }
                            </div>
                        </div>
                </div>
            </form>
            <div className='flex justify-center font-normal font-Oswald text-[#717171]'>
                <button className={`flex items-center px-[15px] py-[10px] hover:text-black rounded-t-[10px] 
                        ${isFocusFilter?' text-[#717171] font-normal':'bg-white text-black font-bold'}`}
                        onClick={handleChooseFilter}>
                        Video đã đăng
                        <IoIosCloudUpload className='ml-[5px]'/>
                        </button>
                <button className={`flex items-center px-[15px] py-[10px] hover:text-black rounded-t-[10px] 
                        ${!isFocusFilter?' text-[#717171] font-normal':'bg-white text-black font-bold'}`}
                        onClick={handleChooseFilter}>
                        Video đã thích
                        <AiFillLike className='ml-[5px]'/>
                </button>
            </div>
            <div className=''>
                <div className='flex justify-center'>
                    <div className='w-3/5 h-auto bg-white'>
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
                <div className='flex justify-center w-auto'>
                    <p className='font-medium font-roboto w-3/5 bg-white pl-[20px] text-[24px]'>
                        Sơn Tùng MTP | Chúng ta của tương lai
                        </p>

                    <hr></hr>
                </div>
                <div className='flex justify-center w-auto'>
                    <div className='font-roboto flex justify-between bg-white w-3/5 pb-[20px] px-[25px] pt-[10px]'>
                        <button className='text-[#3e3e3e] hover:decoration-1 hover:underline'>
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
                <div className='flex justify-center w-auto '>
                    <div className='w-3/5 bg-white pb-4 rounded-[10px] shadow-xl'>
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


            <div className=' flex items-center my-3 pl-[20px]  font-bold pt-[20px] w-3/5 text-black font-sans'>
                <p className='mr-[10px]  text-[20px]'>VIDEO KHÁC</p>    
                <IoMdMenu className='cursor-pointer size-[25px]' />
            </div>
            <div className='flex flex-wrap mx-5 font-normal font-Oswald text-[#717171]'>
                <div className='w-3/12  flex'>
                    <div className='p-[15px] hover:bg-[#dddddd] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className='  rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
                <div className='w-3/12  flex'>
                    <div className='p-[15px] bg-white mx-4 my-4 mb-10 drop-shadow-lg rounded-[10px] cursor-pointer peer peer-focus:bg-[#f2f2f2]'>
                        <img className=' rounded-[20px]' src={thumnail} alt='other'/>
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
            </div>
        </div>
    );
};

export default Profile;