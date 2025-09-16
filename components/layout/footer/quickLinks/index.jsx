import Link from 'next/link';

const QuickLinks = ({ data }) => {
    // console.log(data)
    return (
        <div className='flex flex-col gap-1'>
            {data?.map((link, index) => {
                return (
                    <Link prefetch={false}  href={link.linkHref} className='font-semibold lg:mb-2 lg:mb-1' key={index}>{link.linkTitle}</Link>
                )
            })}
        </div>
    );
};

export default QuickLinks;