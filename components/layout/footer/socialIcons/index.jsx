import Image from "next/image";
import Link from "next/link";
// import { FaXTwitter, FaLinkedin } from "react-icons/fa6";


const SocialIcons = ({ links }) => {
    return (
        <div className="flex justify-center lg:justify-end space-x-4">
            {links.map((link, index) => {
                // const IconComponent = link.icon === 'FaXTwitter' ? FaXTwitter : FaLinkedin;
                return (
                    <Link prefetch={false} 
                        key={index}
                        href={link.href}
                        className="transition ease-in-out duration-300 text-[var(--color-con-gray)] hover:text-white"
                        aria-label="Social Icons"
                    >
                        <Image src={link.icon} height={24} width={24} alt="twitter" />
                        
                        {/* <IconComponent className="w-4 h-4" />  */}
                        {/* because "FaXTwitter" or "FaLinkedin" are special javascript functions provided by react-icons and hence need to be invoke as component */}
                    </Link>
                );
            })}
        </div>
    );
};

export default SocialIcons;