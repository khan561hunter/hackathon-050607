"use client"

import { useState } from "react";
import { motion } from "framer-motion";

import Page_Two2 from "@/app/product-listing/page";


const Page_01:React.FC = () =>{

    const [scrollTarget, setScrollTarget] = useState<number | null>(null);

    const handleScroll = () => {
      if (scrollTarget !== null) {
        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      }
    };
  
    const setTargetSection = (elementId: string) => {
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        setScrollTarget(targetElement.offsetTop);
      }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.6,
            ease: "easeOut",
          },
        }),
      };


    return(
        <main className="w-full bg-gray-500  mx-auto  ">
            <div className="flex grid justify-center ">


                    <motion.div className="text-6xl font-bold  text-nowrap text-gray-400 mx-auto p-[80px] xs:hidden md:block  "
                    
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    
                    variants={cardVariants}>
                        <p className="text-white">Welcome to Our E-commerce Store</p>
                        
                    </motion.div>
                    {/* Mobile View */}
                    <motion.div className="text-4xl font-bold  text-gray-400 mx-auto p-7 text-center md:hidden " 
                
                    
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    
                    variants={cardVariants}>
                        <p>Welcome to Our E-commerce Store</p>
                    </motion.div>



                    <motion.div className="text-lg text-white m-9 text-center p-5 w-[900px] mx-auto xs:hidden md:block"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                     
                     variants={cardVariants}>
                        <p>Discover the ultimate fusion of style, innovation, and functionality with our premium collection of smartwatches. Designed to complement your modern lifestyle, our smartwatches offer seamless connectivity, advanced health monitoring, and customizable features to keep you ahead of the curve. Whether you're tracking your fitness goals, staying on top of notifications, or simply making a fashion statement, our smartwatches are your perfect companion. Explore a range of sleek designs, cutting-edge technology, and unbeatable performance—all crafted to suit your unique needs. Elevate your everyday experience—shop now and redefine how you live, work, and play!</p>
                    </motion.div>
                    {/* Mobile View */}
                    <motion.div className="text-sm text-white m-9 text-center p-5  mx-auto xs:block md:hidden"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                     
                     variants={cardVariants}>
                        <p>Discover the ultimate fusion of style, innovation, and functionality with our premium collection of smartwatches. Designed to complement your modern lifestyle, our smartwatches offer seamless connectivity, advanced health monitoring, and customizable features to keep you ahead of the curve. Whether you're tracking your fitness goals, staying on top of notifications, or simply making a fashion statement, our smartwatches are your perfect companion. Explore a range of sleek designs, cutting-edge technology, and unbeatable performance—all crafted to suit your unique needs. Elevate your everyday experience—shop now and redefine how you live, work, and play!</p>
                    </motion.div>



                    <button onClick={() => {
                setTargetSection("Page_Two");
                handleScroll();
                    }} className="animate-bounce btn p-6  font-bold text-[#451a03] w-[150px] bg-gradient-to-r from-amber-900 to-yellow-500 rounded-full mx-auto xs:hidden md:block ">Scroll Below </button>
                    {/* Mobile View */}
                    <button onClick={() => {
                setTargetSection("Page_Two");
                handleScroll();
                    }} className="animate-bounce btn p-3  font-bold text-[#451a03] w-[150px] bg-gradient-to-r from-amber-900 to-yellow-500 rounded-full mx-auto my-6 xs:block md:hidden ">Scroll Below </button>

            </div>

            <div id="Page_Two">
                    <Page_Two2 />
                </div>

            
        </main>
    )
}

export default Page_01;