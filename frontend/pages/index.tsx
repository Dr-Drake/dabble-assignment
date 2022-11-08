import React from 'react';
import type { NextPage } from 'next'
import Table from '../components/Table'
import Toolbar from '../components/Table/Toolbar'
import { useCountries } from '../hooks/useCountries'
import toast from 'react-hot-toast';
import { parseErrorMessage } from '../utils/errorUtils';
import MainLayout from '../layouts/MainLayout';

interface HomeProps{
  //fallback: { [index:string]: Quiz[] };
}

const Home: NextPage<HomeProps> = () => {

  // Fetched and Cached data
  const { data, isLoading, error } = useCountries();

  // Effect
  React.useEffect(()=>{
    if (error) {
      console.log(JSON.stringify(error));
      toast.error(parseErrorMessage(error));
    }
  },[error])

  return (
    <MainLayout>
      <Toolbar/>
       <Table 
        data={data}
        isLoading={isLoading}
      />
    </MainLayout>
  )
}

export default Home;
