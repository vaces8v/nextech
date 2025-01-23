import React, { Dispatch, SetStateAction, useState, useMemo } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Kbd } from "@heroui/kbd";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Badge } from "@heroui/badge";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, SearchIcon, Logo, UserIcon } from "@/components/icons";
import { IProductCard } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { products } from "@/app/page";

export const Navbar = ({
  cart,
  isCartOpen,
  setIsCartOpen,
}: {
  cart: IProductCard[];
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalSearchQuery, setModalSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = modalSearchQuery || searchQuery;

    if (!query) return [];

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product?.description &&
          product.description.toLowerCase().includes(query.toLowerCase())),
    );
  }, [searchQuery, modalSearchQuery]);

  const handleSearchInputClick = () => {
    setIsSearchModalOpen(true);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Поиск..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={searchQuery}
      onClick={handleSearchInputClick}
      onValueChange={(value) => {
        setSearchQuery(value);
        setIsSearchModalOpen(value.length > 0);
      }}
    />
  );

  return (
    <>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">NexTech</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden md:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden flex-end sm:flex gap-2 w-[325px]">
            {searchInput}
          </NavbarItem>
          <NavbarItem className="flex">
            <Badge
              className="text-white"
              color="warning"
              content={cart.length}
              isInvisible={cart.length === 0}
              variant="shadow"
            >
              <Button
                isIconOnly
                className="text-sm font-normal text-default-600 bg-default-100"
                content="Корзина"
                startContent={
                  <Icon className="text-lg" icon="mdi:cart-outline" />
                }
                variant="flat"
                onPress={() => setIsCartOpen(!isCartOpen)}
              />
            </Badge>
          </NavbarItem>
          <NavbarItem className="flex items-center gap-2">
            <NextLink href="/profile">
              <Button
                isIconOnly
                className="text-sm font-normal text-default-600 bg-default-100"
                content="Профиль"
                startContent={<UserIcon className="text-lg" />}
                variant="flat"
              />
            </NextLink>
          </NavbarItem>
          <NavbarItem className="hidden md:flex gap-2">
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarItem className="flex">
            <Badge
              className="text-white"
              color="warning"
              content={cart.length}
              isInvisible={cart.length === 0}
              variant="shadow"
            >
              <Button
                isIconOnly
                className="text-sm font-normal text-default-600 bg-default-100"
                content="Корзина"
                startContent={
                  <Icon className="text-lg" icon="mdi:cart-outline" />
                }
                variant="flat"
                onPress={() => setIsCartOpen(!isCartOpen)}
              />
            </Badge>
          </NavbarItem>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>

      <Modal
        classNames={{
          base: "h-[80vh] max-h-[80vh]",
          body: "overflow-y-auto",
        }}
        isOpen={isSearchModalOpen}
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={setIsSearchModalOpen}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              labelPlacement="outside"
              placeholder="Найти товар..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
              value={modalSearchQuery}
              onValueChange={setModalSearchQuery}
            />
          </ModalHeader>
          <ModalBody>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-default-400">Ничего не найдено</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsSearchModalOpen(false)}
            >
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
