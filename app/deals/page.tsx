"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Image from "next/image";

import { products } from "@/app/page";

export default function DealsPage() {
  const dealsProducts = products
    .map((product) => ({
      ...product,
      originalPrice: product.price,
      discount: Math.floor(Math.random() * 30) + 10,
    }))
    .filter((product) => product.discount > 20);

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-white mb-10 text-center tracking-tight 
          bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Технологические предложения
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dealsProducts.map((product) => (
            <Card 
              key={product.id} 
              className="
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-2xl 
                bg-gray-800 border-2 border-gray-700
                rounded-2xl overflow-hidden
                group
              "
            >
              <CardHeader className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40 z-10"></div>
                <div className="absolute inset-0 z-20 
                  group-hover:shadow-[0_0_50px_20px_rgba(6,182,212,0.3)] 
                  transition-shadow duration-300 
                  group-hover:scale-105
                "></div>
                <Image
                  src={`${product.url}`}
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <Chip 
                  color="primary" 
                  variant="solid" 
                  className="
                    absolute top-4 right-4 text-sm font-bold 
                    bg-gradient-to-r from-cyan-500 to-blue-600
                    text-white
                    z-30
                  "
                >
                  {product.discount}% OFF
                </Chip>
              </CardHeader>
              
              <CardBody className="p-6 bg-gray-800 text-white">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                    {product.name}
                  </h2>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </p>
                      <p className="text-2xl font-extrabold text-cyan-400">
                        {(
                          product.price *
                          (1 - product.discount / 100)
                        ).toLocaleString()}{" "}
                        ₽
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
              
              <CardFooter className="p-6 pt-0 bg-gray-800">
                <Button 
                  className="
                    w-full 
                    bg-gradient-to-r from-cyan-500 to-blue-600
                    text-white 
                    font-bold 
                    py-3 
                    rounded-lg 
                    hover:from-cyan-600 hover:to-blue-700 
                    transition-all 
                    duration-300
                    group-hover:scale-105
                  "
                >
                  Купить сейчас
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
