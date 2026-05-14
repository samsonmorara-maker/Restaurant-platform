import React from "react";
import { Link } from "react-router-dom";
function Herosection(){
    return(
        <>
        <div className="relative text-white pt-30 px-6  md:px-12 lg:px-50 lg:pt-70 bg-cover bg -center lg:min-h-[800px] min-h-100 md:min-h-600 w-full"
                style={
                { backgroundImage:"url('https://images.openai.com/static-rsc-4/H66Gl6d1203zoESB2lnn7wjYzgofEv5EhGAI1IOV3kFBT_YAb9GTiGGxHbFTYgSWXc8CP5VMs0Vp5gb5c4SUVd1-7GCWcN5WDCTVaH0XQlbHfkPF13Z3SX_gJay1WadTe1ihfHOf3f_YB9UwPh63F_6PF4-Gl2396ZuhNGP0gcEWeFmjKHj5NGFmV9ka0LbX?purpose=fullsize')",
                 
                }}>
                   <h1 className="text-5xl md:text-8xl lg:text-12xl font-extrabold"> Good Food,<br/>Great Moments</h1>
                   <p className="text-xl md:text-2xl lg:text-5xl">Discover the best restaurants, delicious <br />meals and unforgettable dining experiences</p>
                   <p className="text-xl md:text-2xl ">Find your favorite restaurants 
                   <Link to="/restaurants">
                   <button className="bg-orange-600 font-bold px-4 py-2 rounded-full  ml-5  ">here</button>
                   </Link></p>
                   

        </div>

        </>
    );
}


export default Herosection;