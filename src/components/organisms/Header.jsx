"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { WalletMinimal, ShoppingBag, User, Bolt, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-manrope",
});

const headerLinks = [
  { href: "#", label: "Marketplace", active: false },
  { href: "#", label: "My websites", active: true },
  { href: "#", label: "My Orders", active: false },
  { href: "#", label: "My projects", active: false },
  { href: "#", label: "Recieved orders", active: false },
];

const icons = [WalletMinimal, ShoppingBag, User, Bolt];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const renderNavLinks = (isMobile = false) =>
    headerLinks.map(({ href, label, active }) => (
      <Link
        key={label}
        href={href}
        className={`${
          isMobile
            ? "py-2 px-3"
            : "h-full flex items-center justify-center px-2 align-middle"
        } font-medium text-[16px] leading-[24px] tracking-[-0.25px] ${
          active
            ? "text-[#613FDD] bg-[#F4F1FF] border-b-2 border-[#613FDD] font-semibold"
            : "hover:text-[#613FDD]"
        }`}
        onClick={isMobile ? () => setIsOpen(false) : undefined}
      >
        {label}
      </Link>
    ));

  const renderIcons = () =>
    icons.map((Icon, idx) => (
      <Icon
        key={idx}
        size={24}
        className="cursor-pointer text-gray-400 hover:text-black"
      />
    ));

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-[58px]">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="logo" width={29} height={35} />
          <span
            className={`${manrope.variable} font-manrope font-semibold text-[22px] leading-[24.29px] tracking-normal text-[#0F0C1B]`}
          >
            Kraken
          </span>
        </Link>
        <nav className="hidden lg:flex h-full space-x-2">
          {renderNavLinks()}
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          {renderIcons()}
        </div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700"
          variant="ghost"
          size="icon"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {isOpen && (
        <div className="lg:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2 mt-2">
            {renderNavLinks(true)}
          </nav>
          <div className="flex justify-around mt-4">{renderIcons()}</div>
        </div>
      )}
    </header>
  );
}

export default Header;
