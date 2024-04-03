import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <div className="font-thin flex justify-center items-center text-2xl cursor-pointer">
                <Link to={'/blogs'}>Medium</Link>
            </div>
            
            <div className="flex">
            <Link to={'/publish'}>
            <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
            </Link>

            <div className="pl-4">
                <Avatar size={"big"}
                name="Amit Chauhan"/>
            </div>
            </div>

        </div>
    )
}
