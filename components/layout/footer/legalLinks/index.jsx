import Link from "next/link";

const LegalLinks = ({ data }) => {
    // console.log(data)
    return (
        <div className="flex flex-wrap justify-center lg:justify-start items-center text-[var(--color-con-gray)]">
            {data?.map((link, index) => (
                <div key={index}>
                    <Link prefetch={false}
                        href={link.linkHref}
                        className="transition ease-in-out duration-300 hover:text-white text-con"
                    >
                        {link.linkTitle}
                    </Link>
                    {index < data.length - 1 && <span className="mx-2 font-semibold">|</span>}
                </div>
            ))}
        </div>
    );
};

export default LegalLinks;