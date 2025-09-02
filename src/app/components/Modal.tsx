"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./modal.module.css";

type ModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  price?: string;
  imageSrc?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ open, title, description, price, imageSrc, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    }
  }, [open, onClose]);

  

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        ref={dialogRef}
      >
        <div className={styles.header}>
          {title && (
            <h3 id="modal-title" className={styles.title}>
              {title}
            </h3>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.product}>
            {imageSrc && (
              <div className={styles.productImage}>
                <Image src={imageSrc} alt={title || "Produto"} fill />
              </div>
            )}

            <div className={styles.productDetails}>
              {title && <h4 className={styles.productName}>{title}</h4>}
              {description && <p className={styles.productDescription}>{description}</p>}

              <div className={styles.productMeta}>
                {price && <span className={styles.productPrice}>{price}</span>}
              </div>

            </div>
          </div>

          {children && (
            <div className={styles.extras}>
              {children}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.primaryBtn} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}