"use client";

import { CartProvider, MenuItem } from "@/lib/cart";
import { Header } from "@/components/Header";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CartDrawer } from "@/components/CartDrawer";
import React, { useMemo, useState } from "react";

const MENU: MenuItem[] = [
  {
    id: "kunafa-pistachio",
    name: "????? ???????",
    description: "????? ????? ?? ????? ???? ?????",
    price: 24,
    category: "sweet",
    emoji: "??",
  },
  {
    id: "basbousa",
    name: "?????? ??????",
    description: "?????? ???? ?? ??? ?????",
    price: 18,
    category: "sweet",
    emoji: "??",
  },
  {
    id: "cheesecake-saffron",
    name: "??????? ??????",
    description: "???? ?????? ????? ????? ???",
    price: 28,
    category: "sweet",
    emoji: "??",
  },
  {
    id: "sambosa-cheese",
    name: "?????? ???",
    description: "????? ?????? ????? ??? ?????",
    price: 16,
    category: "savory",
    emoji: "??",
  },
  {
    id: "manakeesh-zaatar",
    name: "?????? ????",
    description: "???? ???? ????? ?????? ?????",
    price: 14,
    category: "savory",
    emoji: "??",
  },
  {
    id: "wrap-chicken",
    name: "??? ????",
    description: "???? ???? ?? ??? ??? ????",
    price: 22,
    category: "savory",
    emoji: "??",
  },
];

function PageContent() {
  const [openCart, setOpenCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "sweet" | "savory">("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return MENU;
    return MENU.filter((m) => m.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <Header onOpenCart={() => setOpenCart(true)} />
      <main className="mx-auto max-w-5xl px-4">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-zinc-900 to-zinc-950 mt-6">
          <div className="p-6">
            <div className="text-2xl font-extrabold">????? ??? ?? ??? ?????</div>
            <div className="text-muted mt-1">
              ?? ?? ??? ???? ? ??????? ???? ??????? ?? ???????
            </div>
            <div className="mt-4 inline-flex gap-2 rounded-full bg-black/30 p-1 border border-border">
              <button
                className={`px-4 py-2 rounded-full text-sm ${activeTab === "all" ? "bg-primary text-black font-bold" : "text-muted hover:text-foreground"}`}
                onClick={() => setActiveTab("all")}
              >
                ????
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm ${activeTab === "sweet" ? "bg-primary text-black font-bold" : "text-muted hover:text-foreground"}`}
                onClick={() => setActiveTab("sweet")}
              >
                ????????
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm ${activeTab === "savory" ? "bg-primary text-black font-bold" : "text-muted hover:text-foreground"}`}
                onClick={() => setActiveTab("savory")}
              >
                ??????
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </section>
      </main>
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
      <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-muted">
        ? {new Date().getFullYear()} ??? ????? ? ???? ?????? ??????
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  );
}
