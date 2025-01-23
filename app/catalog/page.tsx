"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Icon } from "@iconify/react";

import { products } from "@/app/page";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from products
  const categories = Array.from(
    new Set(
      products.map((product) => {
        if (product.name.toLowerCase().includes("phone")) return "Смартфоны";
        if (
          product.name.toLowerCase().includes("laptop") ||
          product.name.toLowerCase().includes("macbook")
        )
          return "Ноутбуки";
        if (
          product.name.toLowerCase().includes("tablet") ||
          product.name.toLowerCase().includes("ipad")
        )
          return "Планшеты";
        if (product.name.toLowerCase().includes("watch")) return "Часы";
        if (
          product.name.toLowerCase().includes("airpods") ||
          product.name.toLowerCase().includes("headphones")
        )
          return "Аудио";

        return "Другое";
      }),
    ),
  );

  // Filter products based on search and category
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null ||
        (selectedCategory === "Смартфоны" &&
          product.name.toLowerCase().includes("phone")) ||
        (selectedCategory === "Ноутбуки" &&
          (product.name.toLowerCase().includes("laptop") ||
            product.name.toLowerCase().includes("macbook"))) ||
        (selectedCategory === "Планшеты" &&
          (product.name.toLowerCase().includes("tablet") ||
            product.name.toLowerCase().includes("ipad"))) ||
        (selectedCategory === "Часы" &&
          product.name.toLowerCase().includes("watch")) ||
        (selectedCategory === "Аудио" &&
          (product.name.toLowerCase().includes("airpods") ||
            product.name.toLowerCase().includes("headphones"))) ||
        (selectedCategory === "Другое" &&
          !categories
            .slice(0, -1)
            .some((cat) =>
              product.name.toLowerCase().includes(cat.toLowerCase()),
            ))),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Каталог Устройств</h1>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Input
            className="flex-grow"
            placeholder="Поиск устройств..."
            startContent={<Icon icon="mdi:magnify" />}
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {[null, ...categories].map((category) => (
          <Button
            key={category || "all"}
            color={selectedCategory === category ? "primary" : "default"}
            variant={selectedCategory === category ? "solid" : "bordered"}
            onClick={() => setSelectedCategory(category)}
          >
            {category || "Все"}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="relative">
              <img
                alt={product.name}
                className="w-full h-64 object-cover"
                src={product.url}
              />
              {!product.inStock && (
                <div className="absolute top-4 right-4">
                  <Chip color="danger" variant="solid">
                    Нет в наличии
                  </Chip>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <div className="flex items-center text-yellow-500">
                  <Icon icon="mdi:star" />
                  <span className="ml-1">{product.stars}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-primary">
                  {product.price.toLocaleString()} ₽
                </p>
                <Button
                  color="primary"
                  isDisabled={!product.inStock}
                  variant="light"
                >
                  {product.inStock ? "Купить" : "Недоступен"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Icon
            className="text-6xl text-default-400 mx-auto mb-4"
            icon="mdi:device-unknown"
          />
          <p className="text-xl text-default-500">Устройства не найдены</p>
        </div>
      )}
    </div>
  );
}
