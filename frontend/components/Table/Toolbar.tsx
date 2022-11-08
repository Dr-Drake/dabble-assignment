import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Toolbar: React.FC<any> = ()=>{
    
    return(
        <div className="flex items-center py-4">

            {/** Serach Input */}
            <div className="relative w-2/4 lg:w-1/5">
                <input 
                    className="border border-black1a text-xs lg:text-sm w-full py-3 pl-10 pr-5 outline-black1a outline-1 focus:outline-2" 
                    type="text"
                    placeholder="Search country..." 
                />
                <div className="absolute left-0 top-0 m-auto h-full flex items-center px-3">
                    <RiSearchLine className="text-sm lg:text-lg" color="#1A1A1A"/>
                </div>
            </div>

            {/** Spacer */}
            <div className="flex-1"></div>

            {/** Add Button */}
            <button className="bg-site hover:bg-site2 text-white font-bold py-2 px-4 rounded">
                Add Entry
            </button>
        </div>
    )
}

export default Toolbar;