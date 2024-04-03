import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@amit63390/medium-common"
import { BACKEND_URL } from "../config";
import axios from "axios";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInput, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput)
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        } catch (e) {
            
        }

    }

    return <div className="h-screen flex justify-center flex-col items-center">


        <div className="px-10">
            <div className="text-3xl font-extrabold">
                Create an account
            </div>
            <div className="text-slate-400">
                {type==="signin"? "Don't have an account?":"Already have an account?"}
                <Link className="pl-2" to={type==="signin"?"/signup":"/signin"}>
                    {type==="signin"?"Sign up":"Sign in"}
                </Link>
            </div>
        </div>
        <div className="pt-5">
        {type==="signup"?<LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
            setPostInputs({
                ...postInput,
                name: e.target.value
            })
        }} />:null}
        <LabelledInput label="Username" placeholder="Enter Username" onChange={(e) => {
            setPostInputs({
                ...postInput,
                username: e.target.value
            })
        }} />
        <LabelledInput label="Password" type={"password"} placeholder="Enter your Password" onChange={(e) => {
            setPostInputs({
                ...postInput,
                password: e.target.value
            })
        }} />
        </div>

        <div className="pt-5">
        <button onClick={sendRequest} type="button" className="w-[400px] h-[50px]  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign Up":"Sign In"}</button>
        </div>
        
    </div>
}


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>

        <label className="block mb-2 text-md font-medium text-gray-900 "><b>{label}</b></label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] h-[50px] p-2.5 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />

    </div>

}