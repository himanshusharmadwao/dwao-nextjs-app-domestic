import { getImageUrl } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

const Card = ({ data = {}, className = "" }) => {
    // console.log(data)

    // const slug = data.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-'); 

    return (
        <div className={`group rounded-lg overflow-hidden md:text-start text-center ${className}`}>
            <Link prefetch={false}  
                href={`/blog/${data?.slug}` || '#'}
                className="relative overflow-hidden rounded-[10px] lg:h-[275px] h-[200px] w-full block"
            >
                <Image
                    src={getImageUrl(data?.thumbnail) || "/blog-thumb.png"}
                    alt={data?.title || "Default Image"}
                    fill
                    priority 
                    quality={80}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </Link>
            <div className="py-6">
                {data?.category || data?.sub_category ? (
                    <div className="text-con leading-[1.4] font-light text-[var(--mainColor)] mb-4 uppercase">
                        {data?.category?.name || "Uncategorized"} | {data?.sub_category?.name || "General"}
                    </div>
                ) : null}

                <Link prefetch={false}  
                    href={`/blog/${data?.slug}` || '#'}
                    className="text-[20px] font-bold text-gray-900 hover:text-[var(--mainColor)] transition-all duration-300"
                >
                    {data?.title || "Untitled Post"}
                </Link>

                {data?.excerpt && (
                    <p className="text-[16px] mt-4">
                        {data?.excerpt?.length > 80 ? `${data?.excerpt?.slice(0, 80)}...` : `${data?.excerpt}...`}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Card;
