"use client";

import { MenuItem, useCart } from "@/lib/cart";
import React from "react";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  return (
    <div className="rounded-2xl bg-card border border-border p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
      <div className="flex items-start gap-4">
        <div className="size-14 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 grid place-items-center text-2xl">
          {item.emoji ?? "???"}
        </div>
        <div className="flex-1">
          <div className="text-lg font-bold">{item.name}</div>
          <div className="text-sm text-muted mt-1">{item.description}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-amber-300 font-extrabold">{item.price.toFixed(2)} ?.?</div>
        <button
          onClick={() => add(item)}
          className="rounded-full bg-primary text-black font-bold px-4 py-2 hover:bg-primary-600 transition-colors"
        >
          ??? ??? ?????
        </button>
      </div>
    </div>
  );
}

