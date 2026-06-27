import { useState } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import user1 from "../assets/landing/37f6e26493ad7565e492e7ef6ba48876acc9442b.jpg"
import user2 from "../assets/landing/ea307ad19ed06cf1640ec826f86730b75ad2c0d6.jpg"
import user3 from "../assets/landing/e8c3d20f65f002b8c57e17a928fc5e6d29b44991.jpg"
import user5 from "../assets/landing/ed48d446e87de4ec755714a5da51437e481cda26.jpg"
import star from "../assets/landing/SVG-1.svg"
import gradient from "../assets/landing/gradient.svg"
import rocket from "../assets/landing/rocket.svg"
import tick from "../assets/landing/tick.svg"
import youtube from "../assets/landing/youtube.svg"
import instagram from "../assets/landing/instagram.svg"
import pinterest from "../assets/landing/pinterest.svg"
import tiktok from "../assets/landing/tiktok.svg"
import verified from "../assets/landing/verified.svg"
import followersIcon from "../assets/landing/followers.svg"
import engagementIcon from "../assets/landing/engagement.svg"
import globe from "../assets/landing/globe.svg"

const listings = [
    {
        platform: 'youtube',
        title: 'Tech YouTube Channel with 120k Subscribers',
        handle: '@TechSavvyAlex - Youtube',
        followers: '120,000',
        engagement: '4',
        tag: 'tech',
        country: 'USA',
        description: 'Established tech channel with high engagement and steady ad revenue. Includes full transfer and assets.',
        price: '7,500',
        featured: true,
        iconBg: 'rgba(255,0,0,0.063)',
        iconSrc: youtube
    },
    {
        platform: 'instagram',
        title: 'Travel Instagram Page with 50k Followers',
        handle: '@wanderlust.sophia - Instagram',
        followers: '50,000',
        engagement: '3',
        tag: 'travel',
        country: 'Canada',
        description: 'Beautifully curated travel page with loyal audience and collaboration history with travel brands.',
        price: '2,800',
        featured: false,
        iconBg: 'rgba(225,48,108,0.063)',
        iconSrc: instagram
    },
    {
        platform: 'pinterest',
        title: 'Fashion Pinterest Board with 90k Monthly Views',
        handle: '@stylebyalex - Pinterest',
        followers: '15,000',
        engagement: '4',
        tag: 'fashion',
        country: 'USA',
        description: 'Highly active fashion and design inspiration board with organic traffic and steady audience growth.',
        price: '950',
        featured: false,
        iconBg: 'rgba(230,0,35,0.063)',
        iconSrc: pinterest
    },
    {
        platform: 'tiktok',
        title: 'Fitness TikTok with 300k Followers',
        handle: '@fitwithdavid - Tiktok',
        followers: '300,000',
        engagement: '5',
        tag: 'fitness',
        country: 'UK',
        description: 'Viral fitness content and consistent posting schedule. Brand deals available and audience in the US & UK.',
        price: '12,000',
        featured: true,
        iconBg: 'rgba(0,0,0,0.063)',
        iconSrc: tiktok
    }
];

function ListingCard({ title, handle, followers, engagement, tag, country, description, price, featured, iconBg, iconSrc }) {
    return (
        <div className="relative flex flex-col w-full max-w-[342px] lg:max-w-[672px] bg-[#FFFFFF] border border-[#F3F4F6] rounded-[16px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
            {featured && (
                <div className="w-full h-[24px] bg-gradient-to-r from-[#F6339A] to-[#AD46FF] flex items-center justify-center">
                    <span className="font-['Rethink_Sans'] font-semibold text-[12px] leading-[16px] text-[#FFFFFF] tracking-[0.3px] uppercase">Featured</span>
                </div>
            )}
            <div className={`flex flex-col px-[20.8px] pb-[20.8px] ${featured ? 'pt-[20.8px]' : 'pt-[34.8px]'}`}>
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-[12px]">
                        <div className="flex shrink-0 items-center justify-center w-[40px] h-[40px] rounded-[4px]" style={{ backgroundColor: iconBg }}>
                            <img src={iconSrc} alt="Platform icon" className="w-[24px] h-[24px]" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-['Rethink_Sans'] font-semibold text-[16px] leading-[24px] text-[#1E2939] lg:w-[329px]">{title}</h2>
                            <p className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#6A7282] mt-[4px]">{handle}</p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-center w-[20px] h-[20px] rounded-full border-[1.6px] border-[#00C950] mt-[4px]">
                        <img src={verified} alt="verified" className="w-[10px] h-[10px]" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center mt-[24px] gap-[16px] lg:gap-[48px]">
                    <div className="flex items-center gap-[6px]">
                        <img src={followersIcon} alt="followers" className="w-[24px] h-[24px]" />
                        <span className="font-['Rethink_Sans'] font-medium text-[18px] leading-[28px] text-[#1D293D]">{followers}</span>
                        <span className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#4A5565]">followers</span>
                    </div>
                    <div className="flex items-center gap-[6px]">
                        <img src={engagementIcon} alt="engagement" className="w-[24px] h-[24px]" />
                        <span className="font-['Rethink_Sans'] font-medium text-[18px] leading-[28px] text-[#1D293D]">{engagement}</span>
                        <span className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#4A5565]">% engagement</span>
                    </div>
                </div>
                <div className="flex items-center mt-[20px] gap-[12px]">
                    <div className="flex items-center justify-center h-[24px] px-[12px] bg-[#FCE7F3] rounded-full">
                        <span className="font-['Rethink_Sans'] font-medium text-[12px] leading-[16px] text-[#E60076] capitalize">{tag}</span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                        <img src={globe} alt="globe" className="w-[24px] h-[24px]" />
                        <span className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#6A7282]">{country}</span>
                    </div>
                </div>
                <p className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-[#4A5565] mt-[12px]">
                    {description}
                </p>
                <div className="flex items-center justify-between mt-[24px] lg:mt-[46px]">
                    <div className="flex items-baseline gap-[4px]">
                        <span className="font-['Rethink_Sans'] font-medium text-[24px] leading-[32px] text-[#1D293D]">${price}</span>
                        <span className="font-['Rethink_Sans'] font-normal text-[12px] leading-[16px] text-[#6A7282]">USD</span>
                    </div>
                    <Link to="/" className="flex items-center justify-center w-[136px] h-[44px] bg-[#4F39F6] rounded-[8px] text-[#FFFFFF] font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] hover:bg-[#3D1DFF] transition-colors">
                        More Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function LandingPage() {
    return (
        <section className="flex flex-col items-center pt-24">
            <div className="flex items-center">
                <div className="flex -space-x-3">
                    <img src={user1} alt="user1" className="w-8 h-8 rounded-full border border-white relative z-10" />
                    <img src={user2} alt="user2" className="w-8 h-8 rounded-full border border-white relative z-20" />
                    <img src={user3} alt="user3" className="w-8 h-8 rounded-full border border-white relative z-30" />
                    <img src={user1} alt="user4" className="w-8 h-8 rounded-full border border-white relative z-40" />
                    <img src={user5} alt="user5" className="w-8 h-8 rounded-full border border-white relative z-50" />
                </div>
                <div className="flex flex-col ml-3">
                    <div className="flex">
                        <img src={star} alt="star" className="w-4 h-4" />
                        <img src={star} alt="star" className="w-4 h-4" />
                        <img src={star} alt="star" className="w-4 h-4" />
                        <img src={star} alt="star" className="w-4 h-4" />
                        <img src={star} alt="star" className="w-4 h-4" />
                    </div>
                    <div className="flex">
                        <p className="font-['Rethink Sans'] font-regular text-[#364153] text-[14px]">
                            Used by 10,000+ users
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex mt-4">
                <p className="font-['Rethink Sans'] text-[36px] lg:text-[60px] font-medium text-[#1E2939]">Buy & Sell your <span className="bg-gradient-to-r from-[#8200DB] to-[#764DE1] bg-clip-text text-transparent">Social</span></p>
            </div>
            <div className="flex mt-[-8px] lg:mt-[-16px]">
                <img
                    src={gradient}
                    alt="gradient"
                    className="w-[157px] h-[6px] lg:w-[262px] lg:h-[10px] ml-[220px] lg:ml-[416px]"
                />
            </div>
            <div className="flex mt-6 px-4 max-w-[356px] lg:max-w-[554px]">
                <p className="font-['Rethink_Sans'] font-normal text-[16px] text-center text-[#1E2939]">
                    A secure marketplace to buy and sell Instagram, YouTube, Twitter, Telegram and more - fast, safe and hassle-free.
                </p>
            </div>
            <div className="relative flex lg:w-[448px] w-[380px] items-center justify-center pt-4">
                <input type="text"
                    placeholder="Instagram account"
                    className="font-['Rethink_Sans'] font-normal text-[14px] text-[#1E293980]/50 px-[14px] h-[54px] w-full border-[#99A1AF] border rounded-[6px]"
                />
                <Link to="/" className="absolute right-[5px] font-['Rethink Sans'] font-[14px] font-light text-[#FFFFFF] flex items-center justify-center h-[44px] w-[92px] bg-[#4F39F6] rounded-[6px] hover:bg-[#3D1DFF] transition-colors">
                    Search
                </Link>
            </div>
            <div className="flex flex-col mt-[64px] items-center">
                <p className="font-['Rethink_Sans'] font-bold text-[24px] text-[#1E2939]">
                    Latest Listings
                </p>
                <p className="font-['Rethink_Sans'] font-normal text-[16px] text-[#45556C;]">
                    Discover the hottest social profiles available right now.
                </p>
                <div className="flex flex-col w-full px-[24px] justify-center items-center mt-[48px] gap-[24px]">
                    {listings.map((item, index) => (
                        <ListingCard key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col mt-[64px]">
                <p className="font-['Rethink_Sans'] font-semibold text-[36px] leading-[40px] text-center text-[#1E2939]">
                    Choose Your Plan
                </p>
                <p className="font-['Rethink_Sans'] font-normal text-[14px] leading-[20px] text-center text-[#6A7282] px-[12px]">
                    Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                </p>
                <div className="flex lg:flex-row flex-col items-center justify-center mt-[48px] px-[16px] gap-[24px]">
                    <div className="flex flex-col relative w-[343px] lg:w-[328px] h-[384px] rounded-[12px] overflow-hidden shadow-sm" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03)), #FFFFFF' }}>
                        <div className="flex flex-col px-[16px] pt-[16px] h-[120px]">
                            <h2 className="font-['Rethink_Sans'] font-bold text-[17px] leading-[24px] text-[#212126]">Free</h2>
                            <p className="font-['Rethink_Sans'] font-semibold text-[24px] leading-[32px] text-[#212126] mt-[8px]">$0</p>
                            <p className="font-['Rethink_Sans'] font-medium text-[11px] leading-[16px] text-[#212126]/65 mt-[8px]">Always free</p>
                        </div>
                        <div className="flex flex-col flex-1 px-[16px] pt-[16.8px] border-t-[0.8px] border-black/11 bg-[#FFFFFF]">
                            <ul className="flex flex-col gap-[12px]">
                                {[
                                    '5 Free Listings',
                                    'Standard Listings',
                                    'Basic Tools',
                                    'Email Support',
                                    'No Branding',
                                    '10% Transaction fee'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-[8px]">
                                        <img src={tick} alt="tick" className="w-[12px] h-[12px]" />
                                        <span className="font-['Rethink_Sans'] font-normal text-[13px] leading-[18px] text-[#212126]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col px-[16px] justify-center h-[63px] border-t-[0.8px] border-black/11 bg-[#FFFFFF]">
                            <Link to="/" className="relative w-full h-[30px] bg-[#4F46E5] rounded-[6px] shadow-[0px_0px_0px_1px_#4F46E5,0px_2px_3px_rgba(34,42,53,0.2),0px_1px_1px_rgba(0,0,0,0.24),inset_0px_1px_1px_rgba(255,255,255,0.07)] overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/11 to-transparent"></div>
                                <span className="relative font-['Rethink_Sans'] font-medium text-[13px] leading-[18px] text-[#FFFFFF]">Subscribe</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col relative w-[343px] lg:w-[328px] h-[384px] rounded-[12px] overflow-hidden shadow-sm" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03)), #FFFFFF' }}>
                        <div className="flex flex-col px-[16px] pt-[16px] h-[120px]">
                            <h2 className="font-['Rethink_Sans'] font-bold text-[17px] leading-[24px] text-[#212126]">Premium</h2>
                            <div className="flex items-baseline mt-[8px] gap-[4px]">
                                <p className="font-['Rethink_Sans'] font-semibold text-[24px] leading-[32px] text-[#212126]">$8</p>
                                <span className="font-['Rethink_Sans'] font-medium text-[11px] leading-[16px] text-[#212126]/65 lowercase">/ month</span>
                            </div>
                            <div className="flex items-center mt-[8px] gap-[8px]">
                                <div className="w-[24px] h-[16px] bg-[#4F46E5] rounded-full relative shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.06)]">
                                    <div className="w-[12px] h-[12px] bg-[#FFFFFF] rounded-full absolute left-[10px] top-[2px]"></div>
                                </div>
                                <span className="font-['Rethink_Sans'] font-medium text-[11px] leading-[16px] text-[#212126]/65">Billed annually</span>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 px-[16px] pt-[16.8px] border-t-[0.8px] border-black/11 bg-[#FFFFFF]">
                            <ul className="flex flex-col gap-[12px]">
                                {[
                                    'Unlimited Listings',
                                    'Featured Listings',
                                    'Ad & Promotion Tools',
                                    '1 - 1 Support',
                                    'Custom Branding',
                                    '7% transaction fee'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-[8px]">
                                        <img src={tick} alt="tick" className="w-[12px] h-[12px]" />
                                        <span className="font-['Rethink_Sans'] font-normal text-[13px] leading-[18px] text-[#212126]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col px-[16px] justify-center h-[63px] border-t-[0.8px] border-black/11 bg-[#FFFFFF]">
                            <Link to="/" className="relative w-full h-[30px] bg-[#4F46E5] rounded-[6px] shadow-[0px_0px_0px_1px_#4F46E5,0px_2px_3px_rgba(34,42,53,0.2),0px_1px_1px_rgba(0,0,0,0.24),inset_0px_1px_1px_rgba(255,255,255,0.07)] overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/11 to-transparent"></div>
                                <span className="relative font-['Rethink_Sans'] font-medium text-[13px] leading-[18px] text-[#FFFFFF]">Start 7-day free trial</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-center mt-[64px] border-[1px] rounded-[8px] bg-gradient-to-r from-[rgba(152,16,250,0.2)] to-[rgba(43,127,255,0.3)] px-[4px] w-[396px] h-[296px] lg:w-[1024px] lg:h-[365px] mx-auto">
                <div className="flex flex-col mt-[49px] lg:mt-[65px] items-center">
                    <div className="flex items-center justify-center w-[144px] h-[28px] bg-white shadow rounded-full gap-2">
                        <img src={rocket} alt="rocket" className="w-[15px] h-[15px]" />
                        <span className="font-['Rethink_Sans'] font-medium text-[12px] leading-[16px] text-transparent bg-clip-text bg-gradient-to-r from-[#9810FA] to-[#2B7FFF]">
                            Trusted by Millions
                        </span>
                    </div>
                    <div className="flex w-[337px] lg:w-[505px] justify-center mt-[16px]">
                        <p className="font-['Rethink_Sans'] font-medium text-[24px] leading-[29px] lg:text-[36px] lg:leading-[43px] text-center text-[#000000]">
                            Sell your Social Accounts <br />
                            <span className="bg-gradient-to-r from-[#8200DB] to-[#764DE1] bg-clip-text text-transparent">with Confidence </span>
                            & Earn Money
                        </p>
                    </div>
                    <div className="flex justify-center w-[343px] lg:w-[497px]">
                        <p className="font-['Rethink_Sans'] font-normal text-[14px] lg:text-[16px] text-center text-[#62748E]">
                            We are the leading social media marketplace that connects brands with their customers With our user-friendly interface.
                        </p>
                    </div>
                    <div className="flex mt-[18px]">
                        <Link to="/" className="flex items-center justify-center font-['Rethink_Sans'] font-normal text-[14px] text-center text-[#ffffff] w-[156px] h-[40px] bg-gradient-to-r from-[#9810FA] to-[#2B7FFF] rounded-[12px] hover:opacity-80 transition-opacity">
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}