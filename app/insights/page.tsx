"use client";

import { products } from "../page";

import { ProductCard } from "@/components/ProductCard/ProductCard";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Избранные Устройства
      </h1>

      <div className="flex justify-center gap-3 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
