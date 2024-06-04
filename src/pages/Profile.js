import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/NavbarApp';
import bgWall from '../assets/images/bgWall.jpg'
import avar from '../assets/images/avar.jpg'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoIosCloudUpload } from "react-icons/io";  
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import Mainvideo from '../components/MainVideo';
import VideoComponent from '../components/VideoComponent';
import { IoMdClose } from "react-icons/io";


const Profile = () => {
    const userToken = localStorage.getItem('userToken');
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [subcribe, setSubcribe] = useState('');
    const [isMe, setIsMe] = useState(false);
    const [isFocusFilter, setFocused] = useState(false);
    const [isOpenComment, setIsOpenComment] = useState(false)

    const handleChooseFilter = () =>
    {
        setFocused(!isFocusFilter);
    }
    const handleOpenComment = () =>
    {
        setIsOpenComment(true)
    }
    const handleCloseComment = () =>
    {
        setIsOpenComment(false)
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
            <div className='flex mx-[160px]'>
                <Mainvideo onClick={handleOpenComment} isActive={isOpenComment}/>
                {
                    isOpenComment?
                    <div className='w-[500px] h-auto shadow-xl bg-white'>
                        <IoMdClose className='px-2 py-2 w-[45px] h-[45px] fill-black-500 float-end cursor-pointer' onClick={handleCloseComment}/>
                    </div>:<div></div>
                }
            </div>


            <div className=' flex ml-[85px] items-center my-3 pl-[20px]  font-bold pt-[20px] w-3/5 text-black font-sans'>
                <p className='mr-[10px]  text-[20px]'>VIDEO KHÁC</p>    
                <IoMdMenu className='cursor-pointer size-[25px]' />
            </div>
            <div className='flex flex-wrap mx-[90px] font-normal font-Oswald text-[#717171]'>
                <VideoComponent/>
                <VideoComponent/>
                <VideoComponent/>
                <VideoComponent/>
                <VideoComponent/>
                <VideoComponent/>

            </div>
        </div>
    );
};

export default Profile;