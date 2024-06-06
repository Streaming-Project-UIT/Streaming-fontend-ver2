import React, {useEffect, useState} from "react";
import NavbarApp from "../components/NavbarApp";
import avar from '../assets/images/avar.jpg'
const ChangeProfile  = () => 
{
    return(
        <div className="w-full">
            <NavbarApp/>
            <div className='h-[60px]'></div>
            <div>
                <img src={avar} alt="Avatar" className="z-10 shadow-xl border-[5px] cursor-pointer border-white top-[100px] left-[350px]
                                transform -translate-x-1/2 absolute w-[250px] h-[250px] rounded-full mb-4" />

            </div>
        </div>
    )
}
export default ChangeProfile