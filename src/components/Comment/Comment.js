import React, {useState, useEffect} from "react";
import avar from '../../assets/images/avar.jpg'
import MonoComment from "./MonoComment";
import { AiOutlineSend } from "react-icons/ai";
const Comment = () =>
{
    return (
        <div className="w-full relative">
          <div className="mx-2 absolute top-0 left-0  w-full flex items-center gap-3 mb-6">
            <input
              type="textbox"
              className="px-4 rounded-[10px] py-3   border-[1px] w-[100%] "
              placeholder="Viết bình luận ..."
            ></input>
            <AiOutlineSend className="cursor-pointer mr-3 size-[40px] rounded-[10px] px-2 py-2 hover:bg-[#ededed]"/>
          </div>
          <div className="h-[80px]"></div>
          <MonoComment />
        </div>
      );
}
export default Comment