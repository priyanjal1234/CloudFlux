import React, { useEffect } from 'react'
import AwsSteps from './AwsSteps'
import authService from '../services/Auth'

const Steps = ({selectedProvider,setStep}) => {
    
    

   if(selectedProvider === "aws") {
    return (
        <div className='flex justify-center w-full p-10'>
            <AwsSteps setStep = {setStep} selectedProvider = {selectedProvider} />
        </div>
    )
   }
   else if(selectedProvider === "azure") {}
   else if(selectedProvider === "gcp") {}
}

export default Steps