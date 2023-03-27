import { AppsOutlined, BusinessCenter, Chat, SearchRounded, Group, HomeRounded, Notifications, Person } from '@mui/icons-material'
import Image from 'next/image'
import HeaderLink from './HeaderLink'
import React, { useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import { UseThemeProps } from "next-themes/dist/types";
import { motion } from "framer-motion";


const Header = () => {
    const [mounted, setMounted] = useState(false);
    const utheme: UseThemeProps = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    const themeChange = () => {
        utheme.setTheme(utheme.resolvedTheme === 'dark' ? 'light' : 'dark')
    }
    return (
        <header className='sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg'>
            {/* left */}
            <div className="flex items-center space-x-2 w-full max-w-xs">
                {mounted && (
                    <>
                        {utheme.resolvedTheme === 'dark' ? (
                            <Image
                                width={50}
                                height={50}
                                alt=''
                                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
                            />
                        ) : (
                            <Image
                                width={50}
                                height={50}
                                alt=''
                                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
                            />
                        )}
                    </>
                )}
                <div className="flex item-center-space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
                    <SearchRounded />
                    <input type="text" placeholder='Searh' className='hidden md:inline-flex bg-transparent text-sm focus:outline-none dark:placeholder-white/75 placeholder-black/70' />
                </div>
            </div>
            {/* right */}
            <div className="flex items-center space-x-6">
                <HeaderLink text="Home" Icon={HomeRounded} feed={true} active={true} />
                <HeaderLink text="My Network" Icon={Group} feed={true} hidden={true} />
                <HeaderLink text="Jobs" Icon={BusinessCenter} feed={true} />
                <HeaderLink text="Messageing" Icon={Chat} feed={true} />
                <HeaderLink text="Notifications" Icon={Notifications} feed={true} />
                <HeaderLink text="Me" Icon={Person} feed={true} hidden={true} />
                <HeaderLink text="Work" Icon={AppsOutlined} feed={true} hidden={true} />
                {mounted &&
                    <div
                        className={`bg-gray-600 px-0.5 flex items-center rounded-full w-12 h-6 flex-shrink cursor-pointer relative ${utheme.resolvedTheme === 'dark' ? "justify-end" : "justify-start"}`}
                        onClick={themeChange}
                    >
                        <span className='absolute left-0.5'>🌔</span>
                        <motion.div
                            className='rounded-full bg-white w-5 h-5 z-40'
                            transition={{ type: 'spring', stiffness: 70, damping: 30 }}
                        />
                        <span className='absolute right-0.5'>🌞</span>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header