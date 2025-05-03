import React from 'react'
import AwsSteps from './AwsSteps'

const Steps = ({selectedProvider,setStep}) => {
    
   if(selectedProvider === "aws") {
    return (
        <div className='flex justify-center w-full p-10'>
            <AwsSteps setStep = {setStep} />
        </div>
    )
   }
   else if(selectedProvider === "azure") {}
   else if(selectedProvider === "gcp") {}
}

export default Steps