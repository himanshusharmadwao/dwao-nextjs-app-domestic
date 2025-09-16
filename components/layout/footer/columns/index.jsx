import Link from 'next/link';

const Column = ({ data, title }) => {
    return (
        <div>
            <h3 className="font-semibold lg:mb-4 mb-1">{title}</h3>
            <ul className="lg:space-y-4 space-y-1 text-con">
                {data.map((link, index) => (
                    <li key={index}>
                        <Link
                            className="transition-all duration-100 text-[var(--color-con-gray)] hover:text-white"
                            href={link.linkHref}
                        >
                            {link.linkTitle}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Column;