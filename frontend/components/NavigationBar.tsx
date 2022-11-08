import React from 'react';

const NavigationBar: React.FC<any> = ()=>{

    return(
        <nav className='sticky p-5 bg-gradient-to-r from-site2 to-site'>
            <div className='flex items-center justify-center'>
                <p className='text-white lg:text-4xl'> Basic CRUD UI</p>
            </div>
        </nav>
    )
}

export default NavigationBar;