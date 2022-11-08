import React from 'react';
import { Formik } from 'formik';
import { CountryFormSchema, CountryFormState } from './schema';
import CustomFormTextInput from '../../components/CustomFormInput';
import { CountryResponseData } from '../../types/CountryResponse';


export interface CountryFormProps{
    onFormSubmit?: (state: CountryFormState, resetForm?: ()=> void)=> void; 
    loading?: boolean;
    data?: CountryResponseData;
}

const CountryForm: React.FC<CountryFormProps> = ({ onFormSubmit, loading, data })=>{


    // State
    const [submitted, setSubmitted] = React.useState<boolean>(false);

    let initialValues: CountryFormState = {
        area:  data?.Area.toString() || '',
        country: data?.Country || '',
        total_population: data?.Total_population.toString() || '',
        year: data?.Year || '',
    }


    return(
        <Formik
            initialValues={initialValues}
            validationSchema={CountryFormSchema}
            onSubmit={(values, actions)=>{
               
                setSubmitted(false); 
                onFormSubmit && onFormSubmit(values, actions.resetForm);
              
            }}
        >
            { (props)=>
            <form onSubmit={(e)=> e.preventDefault()} className="w-full" >
                <CustomFormTextInput
                    placeholder='Country'
                    error={!!props.errors.country && submitted}
                    errorMessage={props.errors.country}
                    onChange={props.handleChange('country')}
                    value={props.values.country}
                    containerClass="form-input"
                />
                <CustomFormTextInput
                    placeholder='Area (in square kilometers'
                    error={!!props.errors.area && submitted}
                    errorMessage={props.errors.area}
                    onChange={(e)=>{
                        let value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g, '$1').replace(/^0[^.]/, '0');
                        props.setFieldValue('area', value);
                    }}
                    value={props.values.area}
                    containerClass="form-input"
                />
                <CustomFormTextInput
                    placeholder='Total Population'
                    error={!!props.errors.total_population && submitted}
                    errorMessage={props.errors.total_population}
                    onChange={(e)=>{
                        let value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g, '$1').replace(/^0[^.]/, '0');
                        props.setFieldValue('total_population', value);
                    }}
                    value={props.values.total_population}
                    containerClass="form-input"
                />
                <CustomFormTextInput
                    placeholder='Year'
                    error={!!props.errors.year && submitted}
                    errorMessage={props.errors.year}
                    onChange={(e)=>{
                        let value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g, '$1').replace(/^0[^.]/, '0');
                        props.setFieldValue('year', value);
                    }}
                    value={props.values.year}
                    containerClass="form-input"
                />

                <div className='flex justify-end'>
                    <button className="bg-site hover:bg-site2 text-white font-bold py-2 px-4 rounded"
                        onClick={()=>{
                            props.handleSubmit();
                            setSubmitted(true)
                        }}
                        disabled={loading}
                    >
                        { data ? 'Update' : 'Add Entry' }
                    </button>
                </div>
            </form>
            }
        </Formik>
    )
}


export default CountryForm;