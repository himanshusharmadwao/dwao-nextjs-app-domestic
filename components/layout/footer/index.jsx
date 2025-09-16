import Column from './columns/index';
import LegalLinks from './legalLinks/index';
import SocialIcons from './socialIcons/index';
import QuickLinks from './quickLinks/index';
import CompanyInfo from './companyInfo';
import { getLegalMenu, getMenu, getQuickLinks } from '@/libs/apis/data/menu';
import Newsletter from './newsletter';

const Footer = async ({preview}) => {

  let menuData = { data: [] };

  try {
    menuData = await getMenu(preview);
  } catch (error) {
    console.error("Failed to fetch menu data:", error);
  }

  const legalMenu = await getLegalMenu(preview);
  const quickLinks = await getQuickLinks(preview);

  const socialLinks = [
    {
      title: "Twitter",
      icon: "/icons/fa-twitter.svg",
      href: "#"
    },
    {
      title: "LinkedIn",
      icon: "/icons/fa-linkedin.svg",
      href: "#"
    }
  ];

  return (
    <footer className="bg-black text-white py-[5rem]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-4">
          {/* First Column */}
          <div className="mb-4 lg:mb-0 col-span-4">
            <div className='lg:w-[80%] w-full lg:text-left text-center'>
              <CompanyInfo preview={preview} />
              <Newsletter />
            </div>
          </div>

          <div className="col-span-6 lg:mt-0 mt-10">
            <div className="grid grid-cols-5">
              {/* Second Column */}
              <div className='col-span-2'>
                 <QuickLinks data={quickLinks?.data[0]?.menu} />
              </div>

              {/* Third Column */}
              <div className='col-span-2'>
                {menuData.data.flatMap(item =>
                  item.menu.filter(nestedItem => nestedItem.linkTitle === "Capabilities")
                ).map(nestedItem => (
                  <Column key={nestedItem.id} title="Capabilities" data={nestedItem.subMenu} />
                ))}
              </div>

              {/* Fourth Column */}
              <div className="flex justify-end col-span-1">
                {menuData.data.flatMap(item =>
                  item.menu.filter(nestedItem => nestedItem.linkTitle === "Partners")
                ).map(nestedItem => (
                  <Column key={nestedItem.id} title="Partners" data={nestedItem.subMenu} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal and Social Links */}
        <div className="mt-14 border-t border-gray-700 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <LegalLinks data={legalMenu?.data[0]?.menu} />

          <SocialIcons links={socialLinks} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;