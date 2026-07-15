import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Footer() {
    return (
        <footer className="w-full bg-[#FFFFFF] flex flex-col pt-[40px] px-[24px] lg:px-[128px] pb-[32px] mt-[48px]">
            <div className="flex flex-col lg:flex-row lg:justify-between w-full">
                <div className="flex flex-col w-full lg:w-[376px]">
                    <img src={logo} alt="logo" className="w-[122px] h-[40px]" />
                    <p className="font-['Rethink_Sans'] font-normal text-[14px] leading-[28px] text-[#62748E] mt-[28.8px]">
                        flipearn is a social media marketplace . We are the leading social media marketplace that connects brands with their customers With our user-friendly interface.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row mt-[61.6px] lg:mt-[3px] gap-[56px] lg:gap-[140px]">
                    <div className="flex flex-col">
                        <h2 className="font-['Rethink_Sans'] font-semibold text-[14px] leading-[20px] text-[#1E2939]">Company</h2>
                        <ul className="flex flex-col gap-[10px] mt-[20px]">
                            <li>
                                <Link to="/" className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#62748E]">About us</Link>
                            </li>
                            <li className="flex items-center gap-[8px]">
                                <Link to="/" className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#62748E]">Careers</Link>
                                <div className="flex items-center justify-center w-[83px] h-[24px] bg-[#4F39F6] rounded-[6px]">
                                    <span className="font-['Rethink_Sans'] font-normal text-[12px] text-[#FFFFFF]">We’re hiring!</span>
                                </div>
                            </li>
                            <li>
                                <Link to="/" className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#62748E]">Contact us</Link>
                            </li>
                            <li>
                                <Link to="/" className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#62748E]">Privacy policy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col w-full lg:w-[377px]">
                        <h2 className="font-['Rethink_Sans'] font-semibold text-[14px] leading-[20px] text-[#1E2939]">Subscribe to our newsletter</h2>
                        <p className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#62748E] mt-[20px]">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <div className="flex items-center w-full h-[52px] bg-[#EEF2FF] rounded-[6px] mt-[26.4px] px-[8px]">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 bg-transparent border-none outline-none font-['Rethink_Sans'] text-[14px] text-[#62748E] placeholder:text-[#62748E]/50 px-[4px]" 
                            />
                            <Link to="/" className="flex items-center justify-center w-[97px] h-[36px] bg-[#4F39F6] rounded-[4px] text-[#FFFFFF] font-['Rethink_Sans'] font-normal text-[14px]">
                                Subscribe
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-full border-t-[0.8px] border-[#E2E8F0] mt-[12px] lg:mt-[12px] pt-[17.6px] flex justify-center">
                <p className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#62748E] text-center">
                    Copyright {new Date().getFullYear()} © GreatStack All Right Reserved.
                </p>
            </div>
        </footer>
    );
}