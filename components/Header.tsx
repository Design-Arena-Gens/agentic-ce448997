"use client";

import { useCart } from "@/lib/cart";
import React from "react";

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, total } = useCart();
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 ring-4 ring-amber-500/30 grid place-items-center shadow-lg">
            <div className="size-12 rounded-full bg-card grid place-items-center text-2xl font-extrabold text-amber-300">
              ? ?
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-xl font-extrabold tracking-tight">??? ?????</div>
            <div className="text-sm text-muted">?? ?? ??? ????</div>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-3 rounded-full bg-primary text-black px-5 py-2.5 font-bold shadow hover:bg-primary-600 transition-colors"
        >
          <span className="inline-flex items-center">
            ??
            <span className="mx-2">?????</span>
          </span>
          <span className="text-sm bg-black/20 text-black rounded-full px-2 py-0.5">
            {count} | {total.toFixed(2)} ?.?
          </span>
        </button>
      </div>
    </header>
  );
}

