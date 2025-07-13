'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Manrope } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bolt, ShoppingBag, User, WalletMinimal, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-manrope'
})

const headerLinks = [
  { href: "#", label: "Marketplace" },
  { href: "/my-website", label: "My websites" },
  { href: "#", label: "My Orders" },
  { href: "#", label: "My projects" },
  { href: "#", label: "Recieved orders" },
];

function Header() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className='border-b bg-white shadow-sm'>
      <div className='flex item-center justify-between px-4 md:px-6 h-[58px]'>
        <Link href={'/'} className='flex items-center space-x-2'>
          <Image src='/logo.png' alt='logo' width={29} height={35} />
          <span className={`${manrope.variable} font-manrope font-semibold text-[22px] leading-[24.29px] tracking-normal text-[#0F0C1B]`}>
            Kraken
          </span>
        </Link>

        <nav className='hidden lg:flex h-full space-x-2 font-medium text-[16px] leading-[24px] text-[#0F0C1B]'>
          {
            headerLinks?.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`h-full flex items-center justify-center px-2 font-medium text-[16px] leading-[24px] tracking-[-0.25px] align-middle ${path.includes(href)
                  ? "text-[#613FDD] bg-[#F4F1FF] border-b-2 border-[#613FDD] font-semibold"
                  : "hover:text-[#613FDD]"
                  }`}
              >
                {label}
              </Link>
            ))
          }
        </nav>

        <div className='hidden lg:flex items-center space-x-4 text-gray-400'>
          <WalletMinimal size={24} className='cursor-pointer hover:text-black' />
          <ShoppingBag size={24} className='cursor-pointer hover:text-black' />
          <User size={24} className='cursor-pointer hover:text-black' />
          <Bolt size={24} className='cursor-pointer hover:text-black' />
        </div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className='lg:hidden text-gray-700'
          variant='ghost'
          size='icon'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {isOpen && (
        <div className="lg:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2 mt-2 font-medium text-[16px] text-[#0F0C1B]">
            {headerLinks?.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`py-2 px-3 ${path.includes(href)
                  ? "text-[#613FDD] bg-[#F4F1FF] border-b-2 border-[#613FDD] font-semibold"
                  : "hover:text-[#613FDD]"
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-around mt-4 text-gray-400">
            <WalletMinimal
              size={24}
              className="cursor-pointer hover:text-black"
            />
            <ShoppingBag
              size={24}
              className="cursor-pointer hover:text-black"
            />
            <User size={24} className="cursor-pointer hover:text-black" />
            <Bolt size={24} className="cursor-pointer hover:text-black" />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;