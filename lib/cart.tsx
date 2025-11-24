"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "sweet" | "savory";
  emoji?: string;
};

export type CartLine = {
  item: MenuItem;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  remove: (itemId: string) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = (item: MenuItem) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const remove = (itemId: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== itemId));
  };

  const increment = (itemId: string) => {
    setLines((prev) =>
      prev.map((l) =>
        l.item.id === itemId ? { ...l, quantity: l.quantity + 1 } : l
      )
    );
  };

  const decrement = (itemId: string) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.item.id === itemId ? { ...l, quantity: l.quantity - 1 } : l
        )
        .filter((l) => l.quantity > 0)
    );
  };

  const clear = () => setLines([]);

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0),
    [lines]
  );
  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({ lines, add, remove, increment, decrement, clear, total, count }),
    [lines, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

