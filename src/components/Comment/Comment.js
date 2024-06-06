import React, {useState, useEffect} from "react";
import avar from '../../assets/images/avar.jpg'
import MonoComment from "./MonoComment";
const Comment = () =>
{
    return (
        <div className="w-full relative">
          <div className="mx-2 absolute top-0 left-0  w-full ">
            <input
              type="textbox"
              className="px-4 rounded-[10px] py-3 mb-6  border-[1px] w-[90%] "
              placeholder="Viết bình luận ..."
            ></input>
          </div>
          <div className="h-[80px]"></div>
          <MonoComment />
        </div>
      );
}
export default Comment