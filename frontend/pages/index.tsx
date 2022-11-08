import React from 'react';
import type { NextPage } from 'next'
import Table from '../components/Table'
import Toolbar from '../components/Table/Toolbar'
import { useCountries } from '../hooks/useCountries'
import toast from 'react-hot-toast';
import { parseErrorMessage } from '../utils/errorUtils';
import MainLayout from '../layouts/MainLayout';
import CustomModal from '../components/CustomModal';
import CountryForm from '../forms/CountryForm';
import { CountryFormState } from '../forms/CountryForm/schema';
import { useCreateCountryMutation } from '../hooks/useCreateCountryMutation';
import { CountryResponseData } from '../types/CountryResponse';
import { useUpdateCountryMutation } from '../hooks/useUpdateCountryMutation';
import { useDeleteCountryMutation } from '../hooks/useDeleteCountryMutation';
import useCountryPredictions from '../hooks/useCountryPredictions';

const Home: NextPage<any> = () => {

  // Fetched and Cached data
  const { data, isLoading, error, refetch} = useCountries();
  const { createCountry, loading } = useCreateCountryMutation();
  const { updateCountry, loading: updateLoading } = useUpdateCountryMutation();
  const { deleteCountry, loading: deleteLoading } = useDeleteCountryMutation();

  // State
  interface Search{
    term: string;
    fetchPredictions: boolean;
  }
  const [show, setShow] = React.useState<boolean>(false);
  const [dataToUpdate, setDataToUpdate] = React.useState<CountryResponseData>();
  const [search, setSearch] = React.useState<Search>({ term: '', fetchPredictions: false });
  const [displayedData, setDisplayedData] = React.useState<CountryResponseData[]>([]);

  // Predictions
  const [predictions, predictionLoading] = useCountryPredictions(search.term, search.fetchPredictions)

  // Handlers
  const openModal = ()=> {
    setDataToUpdate(undefined);
    setShow(true);
  }
  const closeModal = ()=> setShow(false);

  const handleUpdate = (country: CountryResponseData)=>{
    setDataToUpdate(country);
    setShow(true);
  }

  const handleBlur = ()=>{
    setSearch({ term: search.term, fetchPredictions: true });
  }

  const handleSearchChange = (name: string)=>{
    setSearch({ term: name, fetchPredictions: true });
  }

  const handleDelete = async (name: string)=>{
    if (window.confirm(`Are you sure you want to delete this resource - (${name})?`)) {
      let toastId = toast.loading('Deleting resource ' + name + '...');
      try {
        let result = await deleteCountry({
          variables:{
            name: name
          }
        });
    
        if (result.data) {
          toast.success('Resource deleted successfully', { id: toastId });
          refetch();
        }

      } catch (error: any) {
        toast.error(parseErrorMessage(error), { id: toastId });
      }
    }
  }

  const handleCreateEntry = async (state: CountryFormState, resetForm?: ()=> void)=>{
    let toastId = toast.loading('Creating resource ' + state.country + '...');
    try {
      let result = await createCountry({
        variables:{
          countryData:{
            area: Number.parseInt(state.area),
            country: state.country,
            total_population: Number.parseInt(state.total_population),
            year: state.year
          }
        }
      });
  
      if (result.data) {
        toast.success('Resource created successfully', { id: toastId });
        refetch();
        resetForm && resetForm();
        closeModal();
      }

    } catch (error: any) {
      toast.error(parseErrorMessage(error), { id: toastId });
    }
  }

  const handleUpdateEntry = async (state: CountryFormState)=>{
    let toastId = toast.loading('Updating resource ' + dataToUpdate?.Country + '...');
    try {
      let result = await updateCountry({
        variables:{
          updateCountryData:{
            area: Number.parseInt(state.area),
            country: state.country,
            total_population: Number.parseInt(state.total_population),
            year: state.year
          },

          name: dataToUpdate?.Country
        }
      });
  
      if (result.data) {
        toast.success('Resource updated successfully', { id: toastId });
        refetch();
        closeModal();
      }

    } catch (error: any) {
      toast.error(parseErrorMessage(error), { id: toastId });
    }
  }


  // Effects
  React.useEffect(()=>{
    if (error) {
      console.log(JSON.stringify(error));
      toast.error(parseErrorMessage(error));
    }
  },[error]);

  React.useEffect(()=>{

  if (predictions && predictions.length > 0) {
    setDisplayedData(predictions)
  }
  else if (data) {
    setDisplayedData(data)
  }
    
  },[predictions, data]);


  return (
    <>
    {/** Create Modal */}
    {
      show &&
      <CustomModal show={show} onClose={closeModal}>
        <div className='bg-white p-6 border border-black1aFaded w-10/12 lg:w-8/12'
          onClick={(e)=> e.stopPropagation()}
        >
          <p className='mb-5 text-lg lg:text-2xl'>
            { dataToUpdate ? 'Update Resource' : 'Create Resource' }
          </p>
          <CountryForm
            loading={loading || updateLoading}
            onFormSubmit={dataToUpdate ? handleUpdateEntry : handleCreateEntry}
            data={dataToUpdate}
          />
        </div>
      </CustomModal>
    }

    <MainLayout>

      {/** Toolbar and Table */}
      <Toolbar
        onAdd={openModal}
        onSearchChange={handleSearchChange}
        onSearchClickaway={handleBlur}
        isLoading={predictionLoading}
      />
       <Table 
        data={displayedData}
        isLoading={isLoading}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

    </MainLayout>
    </>
  )
}

export default Home;
