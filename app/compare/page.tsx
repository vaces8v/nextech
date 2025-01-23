"use client";

import { useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Icon } from "@iconify/react";

import { products } from "@/app/page";

export default function CompareProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const availableProducts = products.filter(
    (p) => p.specifications && p.specifications.length > 0,
  );

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId].slice(0, 3),
    );
  };

  const comparedProducts = selectedProducts
    .map((id) => availableProducts.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Сравнение Устройств
      </h1>

      <div className="flex justify-center mb-8 space-x-4">
        {[1, 2, 3].map((index) => (
          <Select
            key={index}
            className="w-64"
            label={`Устройство ${index}`}
            selectedKeys={
              selectedProducts[index - 1]
                ? new Set([selectedProducts[index - 1]])
                : new Set()
            }
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              handleProductSelect(selectedId);
            }}
          >
            {availableProducts.map((product) => (
              <SelectItem
                key={product.id}
                startContent={
                  <img
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded-full"
                    src={product.url}
                  />
                }
                value={product.id}
              >
                {product.name}
              </SelectItem>
            ))}
          </Select>
        ))}
      </div>

      {comparedProducts.length > 1 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-default-100">
                <th className="p-4 text-left">Характеристика</th>
                {comparedProducts.map((product) => (
                  <th key={product?.id} className="p-4 text-center">
                    <img
                      alt={product?.name}
                      className="w-24 h-24 object-cover mx-auto rounded-lg mb-2"
                      src={product?.url}
                    />
                    {product?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparedProducts[0]?.specifications?.map((spec, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 font-semibold bg-default-50">
                    {spec.split(":")[0]}
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product?.id} className="p-4 text-center">
                      {(product?.specifications?.[index] ?? "").split(":")[1]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {comparedProducts.length === 0 && (
        <div className="text-center text-default-500 py-16">
          <Icon className="text-6xl mx-auto mb-4" icon="mdi:compare" />
          <p>Выберите устройства для сравнения</p>
        </div>
      )}
    </div>
  );
}
