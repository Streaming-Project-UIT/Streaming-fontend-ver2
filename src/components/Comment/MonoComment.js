import React, {useState, useEffect} from "react";
import avar from '../../assets/images/avar.jpg'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
const MonoComment = () =>
{
    return (
        <div className="w-full">
            <div className="flex gap-2">
                <img src={avar} alt='Avartar' className="w-[50px] h-[50px] rounded-[50%]"></img>
                <input type="textbox" className="px-3 border-[1px] " placeholder="Nhập comment tại đây" ></input>
            </div>
            <div className="flex gap-2">
                <button className="px-3 py-1">Phản hồi</button>
            </div>
        </div>
    )
}
export default MonoComment