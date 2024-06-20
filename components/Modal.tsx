"use client";
import React, { useEffect, useRef } from "react";

export const Modal = ({ open, onClose, children }: any) => {
  const modalRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    });
  }, []);

  return (
    <section
      ref={modalRef}
      className={`fixed inset-0 z-40 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/70" : "invisible"
      }`}
    >
      <div
        className={`bg-white w-3/4 rounded shadow p-4 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
};
