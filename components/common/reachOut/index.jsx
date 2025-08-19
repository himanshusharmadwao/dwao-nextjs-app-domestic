import { getRegions } from '@/libs/apis/data/menu';
import LinkBtn from '../../ui/link';
import { getReachOutUI } from '@/libs/apis/data/about';

const ReachOut = async ({ preview }) => {

  let data = null;

  try {
    const response = await getReachOutUI(preview);
    data = response.data[0];
  } catch (error) {
    console.error('Failed to fetch ReachOut UI data:', error);
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:basis-[50%] basis-full bg-[var(--mainColor)] lg:p-[13%] p-[5rem]">
        <h2 className="text-center lg:text-start lg:text-[3.2rem] text-[19px] text-white leading-[1] lg:my-[1rem] my-[2rem]">
          {data?.primaryTitle}
        </h2>
        <LinkBtn
          linkTitle={data?.primaryLinkTitle}
          linkHref={data?.primaryLinkHref}
          className="border-white text-white hover:bg-white hover:text-[var(--mainColor)]"
        />
      </div>
      <div className="lg:basis-[50%] basis-full lg:p-[13%] p-[5rem] bg-[#f1f1f1]">
        <h2 className="text-center lg:text-start lg:text-[3.2rem] text-[19px] leading-[1] lg:my-[1rem] my-[2rem]">
          {data?.secondaryTitle}
        </h2>
        <LinkBtn
          linkTitle={data?.secondaryLinkTitle}
          linkHref={data?.secondaryLinkHref}
          className="border-[var(--mainColor)] text-[var(--mainColor)] hover:bg-[var(--mainColor)] hover:text-white"
        />
      </div>
    </div>
  );
};

export default ReachOut;
