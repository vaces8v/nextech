"use client";
import "@/styles/globals.css";
import clsx from "clsx";
import React, { useState } from "react";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/CartDrawer/CartDrawer";
import { useCartStore } from "@/store/cart-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cart, removeFromCart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar
              cart={cart}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
            />
            <main className="container mx-auto max-w-7xl pt-0 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3" />
            <CartDrawer
              cartItems={cart}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onRemoveItem={removeFromCart}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
