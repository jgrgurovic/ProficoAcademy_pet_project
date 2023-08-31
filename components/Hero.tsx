import Image from "next/image";

const Hero = ()=>{
    return(
        <div className="relative">
        <div className="heroImageContainer" >
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-8">
        <h1 className="heroTitle pt-48 px-4 ">
            Unveil the Shadows:<br/>
            Explore the Untold Stories of<br/>
            <span className="red-600 italic font-extrabold">True crime</span>
        </h1>
            </div>
          <div className="heroImage"></div>
        </div>
        </div>
    )

}

export default Hero;