import Link from "next/link"

const LinkBtn = ({ linkHref = "#", linkTitle = "Click", className = "", ...props }) => {
    return(
        <Link prefetch={false}  href={linkHref} {...props} className={`border-[2px] border-solid rounded-[10px] w-full block text-center py-[0.3rem] transition-all duration-300 text-con ${className}`}>{linkTitle}</Link>
    )
}

export default LinkBtn