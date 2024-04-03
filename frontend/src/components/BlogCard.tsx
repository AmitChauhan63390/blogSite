import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: Number;
}
export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b pb-4 w-screen max-w-screen-lg">

                <div className="flex">
                    <div className=""><Avatar name={authorName} /></div>
                    <div className="pl-2 text-sm font-extralight flex justify-center flex-col">{authorName}</div>
                    <div className="pl-1 ">|</div>
                    <div className="pl-2 font-thin text-sm text-slate-400 flex justify-center flex-col">{publishedDate}</div>
                </div>
                <div className="font-semibold text-2xl pt-2">{title}</div>
                <div className="font-thin text-md pt-1">{content.slice(0, 100) + "..."}</div>
                <div className="text-slate-400 text-sm font-thin pt-3">{`${Math.ceil(content.length / 100)}` + " minute(s) read"}</div>


            </div>
        </Link>
    )
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"} dark:bg-gray-600`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} text-xs text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    )
}
