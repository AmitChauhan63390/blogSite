import { Appbar } from "./Appbar"
import { Blog } from "../hooks/index."
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-12 w-full px-10 pt-200 max-w-screen-2xl pt-12 ">
                    <div className="  col-span-8">
                        <div className="text-3xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500">
                            Posted on 2nd December 2023
                        </div>
                        <div className="pt-2">
                            {blog.content}

                        </div>

                    </div>
                    <div className="  col-span-4">
                        <div className="text-lg text-slate-600">Author</div>
                        <div className="flex pt-2">
                            <div className="pr-4 flex justify-center items-center"><Avatar size={"big"} name={blog.author.name||"Anonymous"}/></div>
                            <div className="flex flex-col">
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2">
                                Random catch phrase about the author's ability to grab user's attention
                            </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
