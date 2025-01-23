"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react";

import { useCartStore } from "@/store/cart-store";
import { IProductCard } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: IProductCard[];
  onRemoveItem?: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
}) => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const itemsToRender = cartItems || cart;

  const removeItemHandler = (productId: string) => {
    if (onRemoveItem) {
      onRemoveItem(productId);
    } else {
      removeFromCart(productId);
    }
  };

  const totalPrice = itemsToRender.reduce((sum, item) => sum + item.price, 0);

  return (
    <Drawer
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerHeader className="flex justify-between items-center border-b border-gray-700/10 px-6 py-4">
          <h2 className="text-xl font-bold">Корзина</h2>
          <Button isIconOnly variant="light" onPress={onClose}>
            <Icon className="text-2xl" icon="mdi:close" />
          </Button>
        </DrawerHeader>
        <DrawerBody className="p-0">
          {itemsToRender.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <Icon
                className="text-6xl text-gray-400 mb-4"
                icon="mdi:cart-off"
              />
              <p className="text-gray-500">Ваша корзина пуста</p>
            </div>
          ) : (
            <div className="divide-y">
              {itemsToRender.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      src={item.url}
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => removeItemHandler(item.id)}
                  >
                    <Icon className="text-xl" icon="mdi:trash-can-outline" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
        <DrawerFooter className="border-t border-gray-700/10 p-4">
          <div className="flex justify-between items-center w-full">
            <div className="mb-[15px]">
              <p className="text-sm text-gray-500">Итого:</p>
              <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                isDisabled={itemsToRender.length === 0}
                variant="bordered"
                onPress={clearCart}
              >
                Очистить
              </Button>
              <Button color="primary" isDisabled={itemsToRender.length === 0}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
