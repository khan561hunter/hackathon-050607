import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { client } from "@/sanity/lib/client";
import tshirt from "@/app/components/black-and-white-mens-stripped-t-shirt.jpg"
import Image from "next/image";
import Link from "next/link";
import model from "@/app/components/full-street-fashion-slender-figu.jpg"

import black from "@/app/components/fashion-men-s-individuality-black-and-white-157675.webp"

export default async function Zero(){

    

    return(
        <main className="bg-gray-500 h-screen  mx-auto">
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <Card className="max-w-[1240px] bg-gray-500 mx-auto shadow-lg p-6 my-8">
                            <CardContent>
                                    <div className="border-2 border-gray  md:bg-gradient-to-r md:from-[#F5F5F5] md:to-[#FAF9F6] xs:bg-white   rounded-lg">
                                        <div className="p-6 m-6 md:flex md:items-center">
                                            <div className="flex flex-col gap-4">
                                            <p className="text-3xl font-bold ">Check Out Our New Collections</p>
                                            <p className="text-gray-500 ">Go through our new collections</p>
                                            <Link href={"/Products-Listing"}>
                                            <button className="bg-gray-600 px-2 py-4 text-white rounded-full w-full hidden md:block">Shop Now</button></Link>
                                            </div>
                                            <Image src={model} alt="tshirt" className="mx-2 p-6 HoverEffect xs:hidden md:block" width={800} height={800}/> 
                                            <Image src={tshirt} alt="tshirt" className="mx-2 p-6 HoverEffect xs:block md:hidden w-[500px] h-[200px]"/> 
                                            <Link href={"/Products-Listing"}>
                                            <button className="bg-gray-600 px-2 py-4 text-white rounded-full w-full md:hidden xs:block">Shop Now</button></Link>
                                        </div>
                                    </div>
                                
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="max-w-[1240px] bg-gray-500 mx-auto shadow-lg p-6 my-8">

                            <CardContent>
                                <div className="border-2 border-gray md:bg-white xs:bg-[#d3d3d3]  rounded-lg ">
                                    <div className="p-6 m-6 md:flex md:items-center">
                                        <div className="flex flex-col gap-4">
                                        <p className="text-3xl font-bold ">Check Out Our New Collections</p>
                                        <p className="text-gray-500">Go through our new collections</p>
                                        <Link href={"/Products-Listing"}>
                                        <button className="bg-gray-600 px-2 py-4 text-white rounded-full w-full hidden md:block">Shop Now</button></Link>
                                        </div>
                                         <Image src={tshirt} alt="tshirt" className="mx-6 p-6 HoverEffect hidden md:block" width={500} height={500}/>
                                         <Image src={black} alt="tshirt" className="mx-6 p-6 HoverEffect xs:block md:hidden " />
                                         <Link href={"/Products-Listing"}>
                                        <button className="bg-gray-600 px-2 py-4 text-white rounded-full w-full xs:block md:hidden">Shop Now</button></Link> 
                                    </div>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </CarouselItem>

                    
                    <CarouselItem>
                    <Card className="max-w-[1240px] bg-gray-500 mx-auto shadow-lg p-6 my-8">

                        <CardContent>
                            <div className="border-2 border-gray  xs:bg-[#d3d3d3]  rounded-lg ">
                                <div className="p-6 m-6 md:flex md:items-center md:justify-between">
                                    <div className="flex flex-col gap-4">
                                    <p className="text-3xl font-bold ">Check Out Our New Collections</p>
                                    <p className="text-gray-500">Go through our new collections</p>
                                    <Link href={"/Products-Listing"}>
                                    <button className="bg-gray-600 px-2 py-4 text-white rounded-full w-full hidden md:block">Shop Now</button></Link>
                                    </div>
                                    <Image src={black} alt="tshirt" className="mx-6 p-6 HoverEffect hidden md:block" width={350} height={350}/>
                                    <Image src={black} alt="tshirt" className="mx-6 p-6 HoverEffect xs:block md:hidden bg-cover" />
                                    <Link href={"/Products-Listing"}>
                                    <button className="bg-gray-600 px-2 py-4 text-white rounded-full w-full xs:block md:hidden">Shop Now</button></Link> 
                                </div>
                            </div>
                            
                        </CardContent>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute left-2" />
                <CarouselNext className="absolute right-2"/>
            </Carousel>
        </main>
    )
}