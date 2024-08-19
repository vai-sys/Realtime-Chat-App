import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const Auth = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center  justify-center'>
      <div className='h-[80vh] bg-white border-white border-2 text-opacity-90 shadow-2xl w-[80vw]  md:w-[90vw] lg:w-[70vw] xl:w-60px] rounded-3xl grid xl:grid-cols-2 '>
           <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center'>
                 <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
            </div>
            <p className='font-medium text-center mt-6'>
                Fill in the details to get Started
            </p>

           </div>
           <div className='flex items-center justify-center w-full'>
             <Tabs>
                <TabsList>
                    <TabsTrigger value="login">
                        Login

                    </TabsTrigger>
                    <TabsTrigger value="Signup">
                        Signup
                        
                    </TabsTrigger>
                </TabsList>
                <TabsContent className="" value="login"></TabsContent>
                <TabsContent className="" value="signup"></TabsContent>
             </Tabs>
           </div>
      </div>
    </div>
  )
}

export default Auth
