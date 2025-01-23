"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

import { products } from "@/app/page";
import { ProductCard } from "@/components/ProductCard/ProductCard";

export default function DealsPage() {
  // Apply some random discounts for demonstration
  const dealsProducts = products
    .map((product) => ({
      ...product,
      originalPrice: product.price,
      discount: Math.floor(Math.random() * 30) + 10, // 10-40% discount
    }))
    .filter((product) => product.discount > 20); // Only show significant discounts

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Горячие предложения</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealsProducts.map((product) => (
          <Card key={product.id} className="max-w-full">
            <CardHeader className="flex gap-3">
              <ProductCard product={product} {...product} />
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold line-through text-default-400">
                    {product.originalPrice.toLocaleString()} ₽
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {(
                      product.price *
                      (1 - product.discount / 100)
                    ).toLocaleString()}{" "}
                    ₽
                  </p>
                </div>
                <Chip color="success" variant="solid">
                  {product.discount}% OFF
                </Chip>
              </div>
            </CardBody>
            <CardFooter>
              <Button className="w-full" color="primary" variant="solid">
                Купить сейчас
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
