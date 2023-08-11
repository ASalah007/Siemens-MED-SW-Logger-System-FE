import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import "animate.css"

function ErrorMessage(props) {


    return (
        <div className="flex w-full justify-evenly items-center shadow-md relative  p-4 text-text_secondary bg-[white] rounded-md animate__animated animate__headShake">
            <div className="h-full my-auto ">
                <ErrorIcon fontSize="large" style={{ fill: '#ff595e' }}/>
            </div>
            <div className="w-3/4 ">
                <h3 className="mb-1 font-bold text-black">{props.message}</h3>
            </div>
        </div>
    )

}

export default ErrorMessage