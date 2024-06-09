import React, {useEffect, useState} from "react";
import NavbarApp from "../components/NavbarApp";
import avar from '../assets/images/avar.jpg'
const ChangeProfile  = () => 
{
    const [activeTab, setActiveTab] = useState('password');
    const currentFirstName = localStorage.getItem('firstName')
    const currentLastName = localStorage.getItem('lastName')


    const [avar, setAvar] = useState(null);

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        setAvar(URL.createObjectURL(file));
        };
        const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const [thumbnail, setThumbnail] = useState(null);


    const handleSubmitChangeInfor = (event) =>{
        event.preventDefault();    
    }
    const handleSubmitChangePsw = (event) =>{
        event.preventDefault();
    }
    return(
        <div className="w-full">
            <NavbarApp/>
            <div className='h-[60px]'></div>

            <div className=" gap-10 mt-[20px]">
                <div className="flex justify-center relative items-center rounded-[50%] mb-10">
                    <img src={avar} alt="Avatar" className="z-10  shadow-xl border-[5px] cursor-pointer border-[#cccccc] 
                        h-[200px] w-[200px] rounded-[50%] mb-4"  >
                    </img>
                    <label for="file-input" class="z-50 bottom-0 absolute block cursor-pointer">
                        <span class="px-4 py-2 bg-gray-200 border border-gray-400 rounded-md text-gray-700 hover:border-gray-600">
                            Chọn file
                        </span>
                        <input type="file" id="file-input" accept=".png, .jpg" onChange={handleThumbnailChange}  class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                    
                </div>
                <div>
                    <div className="flex justify-center cursor-pointer my-5 select-none">
                        <ul className="flex font-medium gap-2 ">
                            <li className={`px-4 py-2 rounded-[15px] ${activeTab === 'password' ? ' bg-[#0b57a9] text-white border-black' : 'hover:bg-[#d6d6d6]'}`}
                            onClick={() => handleTabClick('password')}
                            >
                            Đổi mật khẩu
                            </li>
                            <li
                            className={`px-4 py-2 rounded-[15px] ${activeTab === 'infor' ? 'bg-[#0b57a9] text-white border border-black' : 'hover:bg-[#d6d6d6]'}`}
                            onClick={() => handleTabClick('infor')}
                            >
                            Thông tin đăng nhập
                            </li>
                        </ul>
                    </div>
                    {
                        activeTab === 'password'?
                        <form onSubmit={handleSubmitChangePsw}>
                            <div className=" flex justify-center items-center mt-10 mb-4">  
                                <label className="w-[25%] text-[#676767]">
                                    Mật khẩu cũ
                                    <input
                                    type="password"
                                    className="px-4 rounded-[10px] py-3  w-full border-[1px] "
                                    placeholder="Viết bình luận ..."
                                    ></input>
                    
                                </label>

                            </div>
                            <div className=" flex justify-center items-center mb-4">
                                <label className="w-[25%] text-[#676767]">
                                    Mật khẩu mới
                                    <input
                                    type="password"
                                    className="px-4 rounded-[10px] py-3  w-full border-[1px] "
                                    placeholder="Viết bình luận ..."
                                    ></input>
                    
                                </label>

                            </div>
                            <div className=" flex justify-center items-center mb-4">
                                <label className="w-[25%] text-[#676767]">
                                    Nhập lại mật khẩu mới
                                    <input
                                    type="password"
                                    className="px-4 rounded-[10px] py-3  w-full border-[1px] "
                                    placeholder="Viết bình luận ..."
                                    ></input>
                    
                                </label>

                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="items-center flex text-[15px] hover:shadow-md hover:bg-[#376191] bg-[#0b57a9]
                                    text-white font-medium py-[10px] px-4 my-1 rounded-[15px] focus:outline-none focus:shadow-outline "
                                    type="submit">
                                    Đổi mật khẩu
                                </button>                    

                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmitChangeInfor}>
                            <div className=" flex justify-center items-center mt-10 mb-4">  
                                <label className="w-[25%] text-[#676767]">
                                    Họ
                                    <input
                                    type="textbox"
                                    className="px-4 rounded-[10px] py-3  w-full border-[1px] "
                                    placeholder="Nhập họ mới ..."
                                    value={currentFirstName}
                                    ></input>
                    
                                </label>

                            </div>
                            <div className=" flex justify-center items-center mb-4">
                                <label className="w-[25%] text-[#676767]">
                                    Tên
                                    <input
                                    type="textbox"
                                    className="px-4 rounded-[10px] py-3  w-full border-[1px] "
                                    placeholder="Nhập tên mới"
                                    value={currentLastName}
                                    ></input>
                    
                                </label>
                            </div>
                            <div className=" flex justify-center items-center mb-4">

                                <button
                                    className="items-center flex text-[15px] hover:shadow-md hover:bg-[#376191] bg-[#0b57a9]
                                    text-white font-medium py-[10px] px-4 my-1 rounded-[15px] focus:outline-none focus:shadow-outline "
                                    type="submit">
                                    Đổi thông tin 
                                </button>   
                            </div>  
                        </form>
                    }
                </div>
            </div>

        </div>
    )
}
export default ChangeProfile