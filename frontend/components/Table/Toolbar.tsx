import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ClickAwayListener from "react-click-away-listener";

export interface ToolbarProps{
    onAdd?: ()=> void;
    isLoading?: boolean;
    onSearchChange?: (name: string)=> void;
    onSearchClickaway: (event: any)=> void;
}
const Toolbar: React.FC<ToolbarProps> = ({ 
    onAdd, isLoading, onSearchChange, onSearchClickaway 
})=>{
    
    return(
        <div className="flex items-center py-4">

            {/** Serach Input */}
            <ClickAwayListener onClickAway={onSearchClickaway}>
                <div className="relative w-2/4 lg:w-1/5">
                    <input 
                        className="border border-black1a text-xs lg:text-sm w-full py-3 pl-10 pr-5 outline-black1a outline-1 focus:outline-2" 
                        type="text"
                        placeholder="Search country..." 
                        onChange={(e)=>{
                            onSearchChange && onSearchChange(e.target.value)
                        }}
                    />
                    <div className="absolute left-0 top-0 m-auto h-full flex items-center px-3">
                        { !isLoading && <RiSearchLine className="text-sm lg:text-lg" color="#1A1A1A"/> }
                        { isLoading && <AiOutlineLoading3Quarters className="animate-spin text-sm lg:text-lg " color="#1A1A1A"/> }
                    </div>
                </div>
            </ClickAwayListener>

            {/** Spacer */}
            <div className="flex-1"></div>

            {/** Add Button */}
            <button className="bg-site hover:bg-site2 text-white font-bold py-2 px-4 rounded"
                onClick={onAdd}
            >
                Add Entry
            </button>
        </div>
    )
}

export default Toolbar;