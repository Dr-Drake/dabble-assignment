import React from 'react';
import { CountryResponseData } from '../../types/CountryResponse';
import { CgMoreO } from 'react-icons/cg';
import { TbMoodEmpty } from "react-icons/tb";
import ClickAwayListener from 'react-click-away-listener';

export interface TableProps{
    data?: CountryResponseData[];
    isLoading?: boolean;
    onUpdate?: (country: CountryResponseData)=> void;
    onDelete?: (name: string)=> void;
}
const Table: React.FC<TableProps> = ({
    data = [], isLoading, onUpdate, onDelete
})=>{

    // State // TODO pagination
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [showMore, setShowMore] = React.useState<boolean>(false);

    // Variables
    let loadingClasses = 'skeleton [&>*]:opacity-0';


    // Helpers
    const handleMoreClickAway = ()=>{
        setActiveIndex(0);
        setShowMore(false);
    }
    const toggleMore = (e: React.MouseEvent, index: number) =>{
        e.stopPropagation();
        if (index === activeIndex) {
            setActiveIndex(0);
            setShowMore(!showMore);
        }
        else{
            setActiveIndex(index);
            setShowMore(!showMore);
        }
    }
    const handleUpdate = (country: CountryResponseData)=>{
        handleMoreClickAway();
        onUpdate && onUpdate(country);
    }

    const handleDelete = (name: string)=>{
        handleMoreClickAway();
        onDelete && onDelete(name);
    }

    return(
        <div className='flex flex-col justify-between flex-1'>
            <table className='w-full border-b border-black1aFaded'>
                <thead>
                    <tr className='bg-greyf3'>
                        <th className='p-3 text-xs font-medium text-center'>
                            #
                        </th>
                        <th className='p-3 w-3/12 text-xs lg:text-sm font-medium text-center'>
                            Country
                        </th>
                        <th className='p-3  w-3/12 text-xs lg:text-sm font-medium text-center'>
                            Area (km<sup>2</sup>)
                        </th>
                        <th className='p-3 w-3/12 text-xs lg:text-sm font-medium text-center'>
                            Total population
                        </th>
                        <th className='p-3 w-3/12 text-xs lg:text-sm font-medium text-center'>
                            Year
                        </th>
                        <th className='p-3 text-xs lg:text-sm font-medium text-center'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className={isLoading ? loadingClasses : undefined}>
                    {
                        data.map((item, i)=>{

                            return(
                                <tr key={`${i}tr`}>
                                    <td className='p-4 text-center text-xs lg:text-sm'>
                                        { (i + 1) + ((currentPage -1) * 10) }
                                    </td>
                                    <td className='p-4 text-center text-xs lg:text-sm'>
                                        { item.Country }
                                    </td>
                                    <td className='p-4 text-center text-xs lg:text-sm'>
                                        { item.Area }
                                    </td>
                                    <td className='p-4 text-center text-xs lg:text-sm'>
                                        { item.Total_population }
                                    </td>
                                    <td className='p-4 text-center text-xs lg:text-sm'>
                                        { item.Year }
                                    </td>
                                    <td className='p-4'>
                                        <div className='flex justify-center cursor-pointer relative'>
                                            <CgMoreO className='text-sm lg:text-lg'
                                                onClick={(e)=> toggleMore(e, i)}
                                            />
                                            {
                                                showMore && activeIndex === i &&
                                                <ClickAwayListener onClickAway={handleMoreClickAway}>
                                                    <div className='absolute top-0 z-10 bg-white rounded-lg border-2'>
                                                        <div className='p-3 cursor-pointer hover:bg-whiteFaded text-xs lg:text-sm'
                                                            onClick={()=> handleUpdate(item)}
                                                        >
                                                            Update
                                                        </div>
                                                        <div className='p-3 cursor-pointer hover:bg-whiteFaded text-xs lg:text-sm'
                                                            onClick={()=> handleDelete(item.Country)}
                                                        >
                                                            Delete
                                                        </div>
                                                    </div>
                                                </ClickAwayListener>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        data.length === 0 &&
                        <tr>
                            <td colSpan={6} className="p-20">
                                <div className='flex items-center justify-center flex-col w-full'>
                                    <TbMoodEmpty className='text-3xl lg:text-6xl'/>
                                    <div>No countries found</div>
                                </div>
                            </td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Table;