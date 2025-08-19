import { getMenu, getRegions, getSecondaryMenu } from "@/libs/apis/data/menu";
import HeaderWrapper from "./HeaderWrapper";

const Header = async ({ preview }) => {

  const headerData = await getMenu(preview);
  const secMenu = await getSecondaryMenu(preview);
  const regions = await getRegions(preview);

  return <HeaderWrapper headerData={headerData} secMenu={secMenu} regions={regions} />;
};

export default Header;
