import React from 'react';

export interface CustomFormTextInputProps extends 
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    error?: boolean;
    errorMessage?: string;
    containerClass?: string;
}

const CustomFormTextInput = React.forwardRef<HTMLInputElement,CustomFormTextInputProps>(({
    error = false, errorMessage = 'This field is required', containerClass, className,
    ...props 
}, ref)=>{
    // State
    const [isError, setIsError] = React.useState<boolean>(false);

    // Classes
    let inputClasses = 'border border-black1a text-sm w-full p-2.5 outline-none';
    let errorClasses = 'border-errorRed';

    // Effect
    React.useEffect(()=>{
        setIsError(error)
    }, [error]);

    //let forwardedProps: any = { ...props };

    return(
        <div className={containerClass}>
            <input
                className={`${inputClasses} ${className} ${isError ? errorClasses : ''}`}
                {...props}
                ref={ref}
            />
            { 
                isError && 
                <label className='text-xs text-errorRed'>
                    {errorMessage}
                </label> 
            }
        </div>
       
    )
}) 



export default CustomFormTextInput;