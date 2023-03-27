import { Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { motion } from "framer-motion";
import { Article, BusinessCenter, PhotoSizeSelectActual, VideoCameraBack } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '@/atoms/modalAtom';



function Input():JSX.Element {
  const {data} = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  
  const avatarUrl = data?.user?.image? data?.user?.image:'';
  return (
    <div className='rounded-lg p-3 space-y-3 border-gray-300 dark:border-none bg-white dark:bg-[#1D2226]'>
        <div className="flex items-center space-x-2">
          <Avatar src={avatarUrl} className="!h-10 !w-10 cursor-pointer" />
          <motion.button
            className='rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 w-full font-medium text-left'
            whileHover={{
              scale: 1.01
            }}
            whileTap={{
              scale: 0.99
            }}
            onClick={() => {
              setModalOpen(true);
              setModalType('dropIn');
            }}
          >Start a post</motion.button>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-x-10">
          <div className="input-button group">
            <PhotoSizeSelectActual className='text-blue-400' />
            <h4 className='opacity-80 group-hover:opacity-100'>Photo</h4>
          </div>
          <div className="input-button group">
            <VideoCameraBack className='text-green-400' />
            <h4 className='opacity-80 group-hover:opacity-100'>Video</h4>
          </div>
          <div className="input-button group">
            <BusinessCenter className='text-blue-300' />
            <h4 className='opacity-80 group-hover:opacity-100'>Job</h4>
          </div>
          <div className="input-button group">
            <Article className='text-red-400' />
            <h4 className='opacity-80 group-hover:opacity-100 whitespace-nowrap'>Write Article</h4>
          </div>
        </div>
    </div>
  )
}

export default Input