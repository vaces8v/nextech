"use client";
import { useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Icon } from "@iconify/react";
import { Checkbox } from "@heroui/checkbox";

import {
  IProductCard,
  ProductCard,
} from "@/components/ProductCard/ProductCard";
import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { useCartStore } from "@/store/cart-store";

export const products: IProductCard[] = [
  {
    id: "samsung-s24",
    name: "Samsung S24",
    stars: 5,
    price: 999.99,
    countStars: 24,
    url: "https://ir.ozone.ru/s3/multimedia-u/c1000/6901783554.jpg",
    inStock: true,
    description:
      "Флагманский смартфон Samsung нового поколения с передовыми технологиями мобильной фотографии и впечатляющим дизайном. Идеальное устройство для требовательных пользователей.",
    specifications: [
      "Процессор: Snapdragon 8 Gen 3",
      "Дисплей: 6.2 дюйма Dynamic AMOLED 2X",
      "Разрешение камеры: 50 МП + 10 МП + 12 МП",
      "Аккумулятор: 4500 мАч с быстрой зарядкой",
    ],
  },
  {
    id: "iphone-15-pro",
    name: "Iphone 15 Pro",
    stars: 5,
    price: 1200.9,
    countStars: 58,
    url: "https://i-ekb.ru/wp-content/uploads/2023/08/img_8563.jpg",
    inStock: true,
    description:
      "Премиальный смартфон от Apple с титановым корпусом, революционной камерой и мощным чипом A17 Pro. Воплощение инновационных технологий и элегантного дизайна.",
    specifications: [
      "Процессор: Apple A17 Pro",
      "Дисплей: 6.1 дюйма Super Retina XDR",
      "Основная камера: 48 МП",
      "Материал корпуса: Титан",
      "Емкость аккумулятора: До 23 часов воспроизведения видео",
    ],
  },
  {
    id: "sony-xperia-1-iv",
    name: "Sony Xperia 1 IV",
    stars: 4,
    price: 1099.99,
    countStars: 30,
    url: "https://avatars.mds.yandex.net/i?id=13a07a7664ad8fd5947f3e598f935dd1_l-5442358-images-thumbs&n=13",
    inStock: false,
    description:
      "Профессиональный смартфон для мультимедиа с уникальным узким дисплеем 21:9 и продвинутой системой камер. Идеален для создателей контента и фотографов.",
    specifications: [
      "Процессор: Snapdragon 8 Gen 2",
      "Дисплей: 6.5 дюйма 4K OLED 21:9",
      "Камера: Переменный зум 85-125мм",
      "Защита: IP68 от воды и пыли",
    ],
  },
  {
    id: "macbook-pro-16",
    name: "Apple MacBook Pro 16",
    stars: 5,
    price: 2399.99,
    countStars: 45,
    url: "https://avatars.mds.yandex.net/i?id=50337264e59b7a33fe8760dde60d92a4_l-5888746-images-thumbs&n=13",
    inStock: true,
    description:
      "Мощный профессиональный ноутбук с чипом M2 Pro или M2 Max. Непревзойденная производительность для работы с графикой, видео и сложными вычислениями.",
    specifications: [
      "Процессор: Apple M2 Pro/Max",
      "Дисплей: 16.2 дюйма Liquid Retina XDR",
      "Оперативная память: До 96 ГБ",
      "SSD: До 8 ТБ",
      "Графика: Встроенная 19-ядерная GPU",
    ],
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    stars: 4,
    price: 1499.99,
    countStars: 40,
    url: "https://avatars.mds.yandex.net/i?id=dbd749cc5b0e2e7beefb3feeeff7afc520ced763-12522847-images-thumbs&n=13",
    inStock: false,
    description:
      "Компактный и мощный ультрабук с премиальным дизайном. Идеальный выбор для профессионалов, которые ценят производительность и портативность.",
    specifications: [
      "Процессор: Intel Core i7 12-го поколения",
      "Дисплей: 13.4 дюйма InfinityEdge",
      "Разрешение: 4K Ultra HD+",
      "Вес: Всего 1.2 кг",
      "Графика: Intel Iris Xe",
    ],
  },
  {
    id: "samsung-galaxy-tab-s8",
    name: "Samsung Galaxy Tab S8",
    stars: 4,
    price: 799.99,
    countStars: 35,
    url: "https://avatars.mds.yandex.net/i?id=aec74bd92f34871796c3eb731124d1d9_l-5101654-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "apple-airpods-pro",
    name: "Apple AirPods Pro",
    stars: 5,
    price: 249.99,
    countStars: 60,
    url: "https://avatars.mds.yandex.net/i?id=189aae96fb3b39d47204415ea5718646e619ff5f-9711399-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    stars: 5,
    price: 349.99,
    countStars: 50,
    url: "https://avatars.mds.yandex.net/i?id=a5be628d695ec96db331e8658f6dc5bf573d5542-12371687-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "apple-watch-series-8",
    name: "Apple Watch Series 8",
    stars: 5,
    price: 399.99,
    countStars: 55,
    url: "https://avatars.mds.yandex.net/i?id=75df236b85c4bee9b8db4ae0b5fe9d46_l-4979110-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "samsung-galaxy-watch-5",
    name: "Samsung Galaxy Watch 5",
    stars: 4,
    price: 279.99,
    countStars: 30,
    url: "https://avatars.mds.yandex.net/i?id=580fc02bf7789148b6dd08aa238d0e8a_l-8370469-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "gopro-hero-11",
    name: "GoPro Hero 11",
    stars: 5,
    price: 499.99,
    countStars: 65,
    url: "https://avatars.mds.yandex.net/i?id=76670fd644af6523feff756fb6ffa6fe_l-9146954-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "dji-mavic-air-2",
    name: "DJI Mavic Air 2",
    stars: 5,
    price: 799.99,
    countStars: 70,
    url: "https://novosibirsk.kvadromax.ru/upload/image/catalog-main-social-tini/101-113-2288-dji-mavic-air-2.jpg",
    inStock: true,
  },
  {
    id: "canon-eos-r5",
    name: "Canon EOS R5",
    stars: 5,
    price: 3899.9,
    countStars: 80,
    url: "https://avatars.mds.yandex.net/i?id=59b1a3224d2c608e0e32831296aea5b45fd869a7-6467438-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "nikon-z9",
    name: "Nikon Z9",
    stars: 5,
    price: 5499.9,
    countStars: 75,
    url: "https://www.ephotozine.com/articles/nikkor-z-28-400mm-f-4-8-vr-superzoom-lens-announced-36839/images/xlg_Z6II_Z28-400_4-8_front34l_0.jpg",
    inStock: true,
  },
  {
    id: "sony-a7-iv",
    name: "Sony A7 IV",
    stars: 5,
    price: 2499.9,
    countStars: 60,
    url: "https://avatars.mds.yandex.net/i?id=385b7e6769f379216ceb80eb6c251d5e_l-5298709-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "apple-ipad-pro-12-9",
    name: "Apple iPad Pro 12.9",
    stars: 5,
    price: 1099.9,
    countStars: 85,
    url: "https://avatars.mds.yandex.net/i?id=6d57e10d4552eeb3fd7b4a746cbc92d1_l-9559767-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "microsoft-surface-pro-9",
    name: "Microsoft Surface Pro 9",
    stars: 4,
    price: 999.99,
    countStars: 40,
    url: "https://media.wired.com/photos/6345ab0fa476c04573983c33/master/pass/Microsoft-Surface-Pro-9-Gear.jpg",
    inStock: true,
  },
  {
    id: "apple-iphone-14",
    name: "Apple iPhone 14",
    stars: 5,
    price: 799.99,
    countStars: 90,
    url: "https://avatars.mds.yandex.net/i?id=57b53d6abe4bf496e80149db50ac4046e63256ee-4533077-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "samsung-galaxy-s22",
    name: "Samsung Galaxy S22",
    stars: 5,
    price: 799.99,
    countStars: 95,
    url: "https://avatars.mds.yandex.net/i?id=e5798f366ac6419a2b28e383deeacb7d_l-7552332-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "google-pixel-7",
    name: "Google Pixel 7",
    stars: 4,
    price: 599.99,
    countStars: 50,
    url: "https://avatars.mds.yandex.net/i?id=329599a866c3dd49de443bc45b937b91_l-5116207-images-thumbs&n=13",
    inStock: true,
  },
  {
    id: "apple-iphone-13",
    name: "Apple iPhone 13",
    stars: 5,
    price: 699.99,
    countStars: 100,
    url: "https://avatars.mds.yandex.net/get-mpic/4606255/img_id761068687728235743.jpeg/orig",
    inStock: true,
  },
  {
    id: "oneplus-10-pro",
    name: "OnePlus 10 Pro",
    stars: 4,
    price: 899.99,
    countStars: 45,
    url: "https://avatars.mds.yandex.net/get-mpic/11396862/2a0000018b521234a8eaabe5131e5a4bfede/orig",
    inStock: true,
  },
  {
    id: "huawei-mate-50-pro",
    name: "Huawei Mate 50 Pro",
    stars: 5,
    price: 1199.9,
    countStars: 80,
    url: "https://cdn1.ozone.ru/s3/multimedia-v/c600/6665890963.jpg",
    inStock: true,
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<
    IProductCard | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    inStock: false,
    categories: [] as string[],
  });
  const [sortBy, setSortBy] = useState<string>("default");

  const { addToCart } = useCartStore();

  const handleOpenModal = (product: IProductCard) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // In stock filter
        const matchesStockFilter = !filters.inStock || product.inStock;

        // Category filter
        const matchesCategoryFilter =
          filters.categories.length === 0 ||
          filters.categories.some((category) => {
            switch (category) {
              case "smartphones":
                return ["iPhone", "Samsung", "Galaxy", "Pixel"].some((brand) =>
                  product.name.includes(brand),
                );
              case "laptops":
                return ["MacBook", "Dell", "XPS"].some((brand) =>
                  product.name.includes(brand),
                );
              case "tablets":
                return ["iPad", "Tab", "Surface"].some((brand) =>
                  product.name.includes(brand),
                );
              case "audio":
                return ["AirPods", "WH-"].some((brand) =>
                  product.name.includes(brand),
                );
              case "watches":
                return product.name.includes("Watch");
              case "cameras":
                return ["Canon", "Nikon", "Sony A"].some((brand) =>
                  product.name.includes(brand),
                );
              case "drones":
                return product.name.includes("Mavic");
              default:
                return false;
            }
          });

        return matchesSearch && matchesStockFilter && matchesCategoryFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "rating":
            return b.stars - a.stars;
          default:
            return 0;
        }
      });
  }, [searchQuery, filters, sortBy]);

  return (
    <section className="flex flex-col w-full gap-4 py-8 md:py-10">
      <ProductDetails
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
      />

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Input
            className="w-full md:w-1/3"
            placeholder="Поиск товаров..."
            startContent={
              <Icon className="text-default-400" icon="mdi:magnify" />
            }
            value={searchQuery}
            onValueChange={setSearchQuery}
          />

          <Select
            className="w-full md:w-1/4"
            label="Сортировка"
            selectedKeys={new Set([sortBy])}
            onSelectionChange={(keys) =>
              setSortBy(Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="default">По умолчанию</SelectItem>
            <SelectItem key="priceAsc">Цена: от низкой к высокой</SelectItem>
            <SelectItem key="priceDesc">Цена: от высокой к низкой</SelectItem>
            <SelectItem key="rating">По рейтингу</SelectItem>
          </Select>
        </div>

        <div className="flex flex-wrap gap-4">
          <Checkbox
            isSelected={filters.inStock}
            onValueChange={(isSelected) =>
              setFilters((prev) => ({
                ...prev,
                inStock: isSelected,
              }))
            }
          >
            Только в наличии
          </Checkbox>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "smartphones", label: "Смартфоны" },
              { key: "laptops", label: "Ноутбуки" },
              { key: "tablets", label: "Планшеты" },
              { key: "audio", label: "Аудио" },
              { key: "watches", label: "Часы" },
              { key: "cameras", label: "Камеры" },
              { key: "drones", label: "Дроны" },
            ].map((category) => (
              <Checkbox
                key={category.key}
                isSelected={filters.categories.includes(category.key)}
                onValueChange={(isSelected) =>
                  setFilters((prev) => ({
                    ...prev,
                    categories: isSelected
                      ? [...prev.categories, category.key]
                      : prev.categories.filter((c) => c !== category.key),
                  }))
                }
              >
                {category.label}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 w-full justify-center">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            {...product}
            onAddToCart={() => addToCart(product)}
            onOpenDetails={() => handleOpenModal(product)}
          />
        ))}
      </div>
    </section>
  );
}
