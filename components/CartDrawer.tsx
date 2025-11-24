"use client";

import { useCart } from "@/lib/cart";
import React, { useMemo, useState } from "react";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, total, increment, decrement, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201234567890";

  const encodedMessage = useMemo(() => {
    const parts: string[] = [];
    parts.push("??? ???? ?? ??? ?????");
    if (name) parts.push(`?????: ${name}`);
    if (address) parts.push(`???????: ${address}`);
    if (notes) parts.push(`???????: ${notes}`);
    parts.push("???????:");
    lines.forEach((l) => {
      parts.push(`- ${l.item.name} ? ${l.quantity} = ${(l.item.price * l.quantity).toFixed(2)} ?.?`);
    });
    parts.push(`????????: ${total.toFixed(2)} ?.?`);
    parts.push("????? ???!");
    return encodeURIComponent(parts.join("\n"));
  }, [lines, total, name, address, notes]);

  const checkoutUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 bottom-0 right-0 w-full sm:w-[420px] bg-background border-l border-border transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="text-lg font-extrabold">??? ?????????</div>
            <button onClick={onClose} className="text-muted hover:text-foreground">
              ?????
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {lines.length === 0 ? (
              <div className="text-center text-muted py-20">????? ?????</div>
            ) : (
              lines.map((l) => (
                <div
                  key={l.item.id}
                  className="rounded-xl border border-border p-4 bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold">{l.item.name}</div>
                      <div className="text-sm text-muted mt-0.5">
                        {l.item.price.toFixed(2)} ?.?
                      </div>
                    </div>
                    <button
                      onClick={() => remove(l.item.id)}
                      className="text-xs text-muted hover:text-foreground"
                    >
                      ???
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        onClick={() => decrement(l.item.id)}
                        className="px-3 py-1 hover:bg-border/30 rounded-s-full"
                      >
                        ?
                      </button>
                      <span className="px-3">{l.quantity}</span>
                      <button
                        onClick={() => increment(l.item.id)}
                        className="px-3 py-1 hover:bg-border/30 rounded-e-full"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-extrabold text-amber-300">
                      {(l.item.price * l.quantity).toFixed(2)} ?.?
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-border p-4 space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <input
                className="w-full rounded-lg bg-card border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/40 placeholder:text-muted"
                placeholder="????? ??????"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-lg bg-card border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/40 placeholder:text-muted"
                placeholder="??????? / ????"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="w-full rounded-lg bg-card border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/40 placeholder:text-muted"
                placeholder="??????? (???????)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted">????????</div>
              <div className="font-extrabold text-amber-300">
                {total.toFixed(2)} ?.?
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clear}
                className="flex-1 rounded-full border border-border px-4 py-2 text-muted hover:text-foreground hover:bg-border/20"
              >
                ????? ?????
              </button>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 text-center rounded-full px-4 py-2 font-bold text-black bg-primary hover:bg-primary-600 ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
              >
                ????? ????? ??? ??????
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

