export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "NexTech",
  description: "Магазин современной электроники",
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Сделки",
      href: "/deals",
    },
    {
      label: "Избранное",
      href: "/insights",
    },
    {
      label: "Сравнение",
      href: "/compare",
    },
    {
      label: "О нас",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Профиль",
      href: "/profile",
    },
    {
      label: "Корзина",
      href: "/cart",
    },
    {
      label: "Сделки",
      href: "/deals",
    },
    {
      label: "Избранное",
      href: "/insights",
    },
    {
      label: "Сравнение",
      href: "/compare",
    },
    {
      label: "О нас",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/Codeium/nextech-app",
  },
};
