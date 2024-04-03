import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = () => {
    const [title,setTitle] =useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">


                <div className="flex flex-col w-full items-center">
                    <div className="max-w-screen-lg w-full">

                        <input onChange={(e)=>{
                            setTitle(e.target.value)
                        }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="title" />
                        <Texteditor onChange={(e)=>{
                            setDescription(e.target.value)
                        }} />
                <button onClick={async ()=>{
                    const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content:description
                    },{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    }
                    );
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className=" inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
                    Publish Post
                </button>
                    </div>
                    
                        
                  
                </div>
            </div>
        </div>
    )
}


function Texteditor({onChange}:{
    onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void
}) {
    return (
        <form>
            <div className="w-full mb-4">
                <div className="flex items-center justify-between px-3 py-2 border">
                    <div className="px-4 py-2 bg-white rounded-b-lg w-full h-3/4 pt-2">
                        <label className="sr-only">Publish Post</label>
                        <textarea onChange={onChange} name="" id="editor" rows={8} className="pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="write an article" required />
                    </div>
                </div>
                

            </div>
        </form>
    )

}
