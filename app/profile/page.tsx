"use client";
import React, { useMemo } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";

import { Chart } from "@/components/chart";
import { title } from "@/components/primitives";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { IProductCard } from "@/types";

const products: IProductCard[] = [
  {
    id: "iphone-13",
    name: "iPhone 13",
    price: 79999,
    url: "https://avatars.mds.yandex.net/get-mpic/4606255/img_id761068687728235743.jpeg/orig",
    description: "Смартфон Apple iPhone 13",
    stars: 5,
    countStars: 100,
    inStock: true,
  },
];

const generateRandomData = (count: number, min: number, max: number) =>
  Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );

const ProfilePage = () => {
  const purchaseHistory = useMemo(() => {
    const purchaseCount = Math.floor(Math.random() * 6) + 5;

    return Array.from(
      { length: purchaseCount },
      () => products[Math.floor(Math.random() * products.length)],
    );
  }, []);

  // Categorize products for pie chart
  const productCategories = useMemo(() => {
    const categories: { [key: string]: number } = {
      Смартфоны: 0,
      Ноутбуки: 0,
      Планшеты: 0,
      Наушники: 0,
      "Умные часы": 0,
      Камеры: 0,
      Дроны: 0,
    };

    purchaseHistory.forEach((product) => {
      if (
        product.name.includes("iPhone") ||
        product.name.includes("Samsung") ||
        product.name.includes("Galaxy") ||
        product.name.includes("Pixel")
      ) {
        categories["Смартфоны"]++;
      } else if (
        product.name.includes("MacBook") ||
        product.name.includes("Dell") ||
        product.name.includes("XPS")
      ) {
        categories["Ноутбуки"]++;
      } else if (
        product.name.includes("iPad") ||
        product.name.includes("Tab") ||
        product.name.includes("Surface")
      ) {
        categories["Планшеты"]++;
      } else if (
        product.name.includes("AirPods") ||
        product.name.includes("WH-")
      ) {
        categories["Наушники"]++;
      } else if (product.name.includes("Watch")) {
        categories["Умные часы"]++;
      } else if (
        product.name.includes("Canon") ||
        product.name.includes("Nikon") ||
        product.name.includes("Sony A")
      ) {
        categories["Камеры"]++;
      } else if (product.name.includes("Mavic")) {
        categories["Дроны"]++;
      }
    });

    return categories;
  }, [purchaseHistory]);

  const salesData = {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
    datasets: [
      {
        label: "Покупки",
        data: generateRandomData(6, 1000, 5000),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const categoriesChartData = {
    labels: Object.keys(productCategories),
    datasets: [
      {
        label: "Количество покупок",
        data: Object.values(productCategories),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
        ],
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Профиль пользователя</h1>

        <Tabs aria-label="Profile tabs">
          <Tab key="stats" title="Статистика">
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Покупки за полгода</h3>
                </CardHeader>
                <CardBody className="h-[300px]">
                  <Chart
                    data={salesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        title: {
                          display: false,
                        },
                      },
                    }}
                    type="line"
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Категории покупок</h3>
                </CardHeader>
                <CardBody className="h-[300px]">
                  <Chart
                    data={categoriesChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: false,
                        },
                      },
                    }}
                    type="pie"
                  />
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="purchases" title="История покупок">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Последние покупки</h3>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2 justify-center">
                  {purchaseHistory.map((product, index) => (
                    <ProductCard
                      key={`${product.id}-${index}`}
                      product={product}
                    />
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="details" title="Детали профиля">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">
                  Информация о пользователе
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <p>
                    <strong>Имя:</strong> Иван Петров
                  </p>
                  <p>
                    <strong>Email:</strong> ivan.petrov@example.com
                  </p>
                  <p>
                    <strong>Всего покупок:</strong> {purchaseHistory.length}
                  </p>
                  <p>
                    <strong>Общая сумма покупок:</strong>{" "}
                    {purchaseHistory
                      .reduce((sum, product) => sum + product.price, 0)
                      .toFixed(2)}{" "}
                    ₽
                  </p>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
