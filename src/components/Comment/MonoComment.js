import React, {useState, useEffect} from "react";
import avar from '../../assets/images/avar.jpg'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsReplyAll } from "react-icons/bs";
const MonoComment = () =>
{
    return (
        <div className="w-full">
            <div className="flex">
                <img src={avar} alt='Avartar' className="w-[50px] h-[50px] rounded-[50%]"></img>
                <div className="mx-2 mr-5">
                    <p className="font-bold">Nguyễn Thành Đăng</p>
                    <p>Video bạn hay quá, cảm ơn bạn dsadsad sadassssssssssssssssss đá dsa</p>
                    {/* <input type="textbox" className="px-3  py-2 w-full border-[1px] " placeholder="Nhập comment tại đây" ></input> */}

                    
                    <div className="flex gap-3 cursor-pointer w-[120px] items-center rounded-[10px] px-3 py-2 mt-[4px] hover:bg-[#dad9d9]">
                        <BsReplyAll className=""/>
                        <button className="  rounded-[10px] font-bold text-[13px]">Phản hồi</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default MonoComment