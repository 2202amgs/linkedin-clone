import { AddRounded, BookmarkOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

function Sidebar(): JSX.Element{
  const {data} = useSession();
  const avatarUrl = data?.user?.image? data?.user?.image:'';
  return (
    <div className="space-y-2 min-w-max max-w-full">
      <div className="flex flex-col rounded-lg relative bg-white dark:bg-[#1D2226] overflow-hidden items-center text-center border border-gray-300 dark:border-none">
        <div className="relative flex justify-center w-full h-14">
          <Image 
            src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"
            fill={true}
            priority={true}
            alt=""
          />
          <Avatar 
            src={avatarUrl}
            className='!h-14 !w-14 !cursor-pointer !top-5 !border-2'
          />
        </div>
        
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className='underline-offset-2 cursor-pointer decoration-purple-800 hover:underline'>{data?.user?.name}</h4>
          <p className='text-sm text-black/60 dark:text-white/75'>{data?.user?.email}</p>
        </div>

        <div className="hidden md:inline text-left text-sm dark:text-white/75">
          <div className="font-medium sidebar-button space-y-0.5">
            <div className="flex justify-between space-x-2">
              <h4>who viewed your profile</h4>
              <span className="text-blue-500">1000</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>viewed of your post</h4>
              <span className="text-blue-500">1000</span>
            </div>
          </div>
        </div>

        <div className="sidebar-button">
          <h4 className="leading-4 text-xs">
            Access exclusive & insights
          </h4>
          <h4 className="dark:text-white font-medium">
            <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1"></span>{" "}
            Try premium for free
          </h4>
        </div>

        <div className="flex items-center space-x-1.5 sidebar-button">
          <BookmarkOutlined className='!ml-1'/>
          <h4 className='dark:text-white font-medium'>My items</h4>
        </div>
      </div>

      <div className="hidden md:flex bg-white text-black/75 dark:bg-[#1D2226] rounded-lg overflow-hidden dark:text-white flex-col space-y-2 pt-2.5 sticky top-20 border-gray-300 dark:border-none">
        <p className='sidebar-link'>Groups</p>
        <div className="flex item-center justify-between">
          <p className="sidebar-link">Events</p>
          <AddRounded className='!h-5' />
        </div>
        <p className='sidebar-link'>Followed Hashtag</p>
        <div className="sidebar-button text-center">
          <h4 className='dark:text-white font-medium text-sm'>Discover More</h4>
        </div>
      </div>
    </div>
  )
}

export default Sidebar