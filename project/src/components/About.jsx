import React from "react";

const About = () => {
  return (
    <div className="w-full h-full  text-b1 dark:text-[#F8F8F2] flex flex-col  items-center mx-auto px-4 py-20">
      <div className=" flex flex-wrap items-center justify-center gap-6">
        {" "}
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We love{" "}
        </h1>
        <div className="tracking-widest  bg-b5 text-t1 dark:bg-pink-btn flex justify-center item-center px-6 py-4 font-bold text-4xl leading-[2.5rem] rounded-2xl   dark:text-[#301C27]  ">
          comfy
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
        quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio
        aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed
        officiis ea tempore! Similique eos minima sit porro, ratione aspernatur!
      </p>
    </div>
  );
};

export default About;
