import Head from 'next/head';
import React from 'react';
import NavigationBar from '../components/NavigationBar';

const MainLayout: React.FC<any> = ({ children })=>{

    return(
        <div className='flex min-h-screen flex-col'>

             <Head>
                <title>Dabble Assignment</title>
                <meta name="description" 
                    content="A Basic UI to demonstrate the Graphql service I built as part of the assignment" 
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/** Navbar */}
            <NavigationBar/>

            {/** Content */}
            <div className='flex-1 p-3 lg:p-5'>
                { children }
            </div>
        </div>
    )
}

export default MainLayout;