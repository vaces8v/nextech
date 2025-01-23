"use client";
import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

export interface IProductCard {
  id: string;
  name: string;
  url: string;
  stars: number;
  countStars: number;
  price: number;
  description?: string;
  specifications?: string[];
  inStock: boolean;
  onOpenDetails?: () => void;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<{
  product: IProductCard;
  onOpenDetails?: () => void;
  onAddToCart?: () => void;
}> = ({ product, onOpenDetails }) => {
  const { name, url, stars, countStars, price, inStock } = product;

  const [isSelected, setIsSelected] = useState(false);

  return (
    <Card className="py-2 pt-3 px-3 border-none flex flex-col h-full w-full min-h-[380px] max-w-full [@media(max-width:521px)]:w-full [@media(min-width:522px)]:max-w-[225px]">
      <CardBody className="flex-grow flex flex-col overflow-visible p-0">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            isBlurred
            alt={name}
            className="rounded-lg object-cover w-full [@media(min-width:522px)]:h-[200px] [@media(max-width:521px)]:h-[300px] [@media(min-width:522px)]:max-w-[200px] [@media(max-width:521px)]:w-full"
            draggable={false}
            height="1000"
            src={url}
            width="100%"
          />
        </div>
        <div className="flex flex-col mt-[15px] flex-grow">
          <div className="flex justify-between">
            <p className="flex-[0.75] break-words w-[120px] [@media(min-width:522px)]:text-md [@media(max-width:521px)]:text-xl">
              {name}
            </p>
            <p className="flex-[0.5] [@media(min-width:522px)]:text-md [@media(max-width:521px)]:text-xl text-gray-400 break-all w-[80px] text-right">
              {price}$
            </p>
          </div>
          <div className="flex gap-1 mt-[5px]">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                className={`[@media(min-width:522px)]:text-sm [@media(max-width:521px)]:text-xl ${index < stars ? "text-primary" : "text-gray-400"}`}
                icon="ic:round-star"
              />
            ))}
            <p className="text-gray-400 text-[11px]">({countStars})</p>
          </div>
          <button
            className="my-[4px] [@media(min-width:522px)]:text-sm [@media(max-width:521px)]:text-md text-gray-400 text-left w-[120px]"
            onClick={onOpenDetails}
          >
            Узнать больше
          </button>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center p-1">
        <Button
          isIconOnly
          className="mr-1"
          color="default"
          startContent={
            !isSelected ? (
              <Icon
                className="text-2xl text-gray-400"
                icon="mdi:heart-outline"
              />
            ) : (
              <Icon className="text-2xl text-red-600" icon="mdi:heart" />
            )
          }
          variant="light"
          onPress={() => setIsSelected((prev) => !prev)}
        />
        <Button
          color={!inStock ? "default" : "primary"}
          isDisabled={!inStock}
          startContent={
            !inStock ? undefined : (
              <Icon className="text-xl" icon="mdi:cart-outline" />
            )
          }
          onPress={onOpenDetails}
        >
          {!inStock ? "Нет в наличии" : "В корзину"}
        </Button>
      </CardFooter>
    </Card>
  );
};
