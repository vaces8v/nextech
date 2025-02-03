"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react";

import { IProductCard } from "@/components/ProductCard/ProductCard";
import { useCartStore } from "@/store/cart-store";

interface ProductDetailsProps {
  product?: IProductCard;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCartStore();

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex  justify-between items-center px-6 py-4">
              <h2 className="text-2xl font-bold">{product?.name}</h2>
              <Button
                isIconOnly
                className="text-gray-500 hover:bg-gray-100"
                variant="light"
                onPress={onClose}
              >
                <Icon className="text-2xl" icon="mdi:close" />
              </Button>
            </ModalHeader>
            <ModalBody className="flex flex-col md:flex-row gap-6 px-6">
              <div className="w-full md:w-1/2 flex flex-col">
                <Image
                  alt={product?.name}
                  className="rounded-lg object-cover w-full h-[400px]"
                  draggable={false}
                  isBlurred={false}
                  src={product?.url}
                />
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Icon
                        key={index}
                        className={`text-2xl ${index < (product?.stars ? product.stars : 0) ? "text-primary" : "text-gray-400"}`}
                        icon="ic:round-star"
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">
                    ({product?.countStars} reviews)
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-primary">
                    ${product?.price?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-400">
                      Описание:
                    </h3>
                    <p className="text-gray-400 mt-2">
                      {product?.description || "Описание недоступно."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-400">
                      Характеристики:
                    </h3>
                    <ul className="list-disc list-inside text-gray-400 mt-1">
                      {product?.specifications?.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 items-center text-center">
                    <h3 className="text-lg font-semibold text-gray-400">
                      Доступность:{" "}
                    </h3>
                    <p
                      className={`font-bold ${product?.inStock ? "text-green-600" : "text-red-600"}`}
                    >
                      {product?.inStock ? "В наличии" : "Нет в наличии"}
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end gap-3 px-6 py-4">
              <Button color="default" variant="bordered" onPress={onClose}>
                Закрыть
              </Button>
              <Button
                className="min-w-[120px]"
                color="primary"
                isDisabled={!product?.inStock}
                onPress={() => {
                  if (product) {
                    addToCart(product);
                    onClose();
                  }
                }}
              >
                Добавить в корзину
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
