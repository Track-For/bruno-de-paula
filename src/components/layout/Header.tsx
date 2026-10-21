"use client";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { navigation } from "@/data/navigation";
import { company } from "@/data/company";
export default function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = "";
    trigger.current?.focus();
  };
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  useEffect(() => {
    const sentinel = document.querySelector(".header-sentinel");
    const observer = new IntersectionObserver(([entry]) => {
      document
        .querySelector(".site-header")
        ?.classList.toggle("scrolled", !entry.isIntersecting);
    });
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className="header-sentinel" />
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" aria-label="ASP — página inicial" className="brand">
            <Image
              src={company.logo}
              alt="Andrade, Scarpelli & Paula — Advogados Associados"
              width={490}
              height={219}
              priority
            />
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.slice(0, 4).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={path.startsWith(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/contato" className="header-contact">
            Entre em contato <ArrowUpRight size={16} />
          </Link>
          <button
            ref={trigger}
            className="menu-trigger"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu principal"
        onCancel={close}
        onClose={() => {
          document.body.style.overflow = "";
        }}
      >
        <div className="mobile-top">
          <span>ASP / NAVEGAÇÃO</span>
          <button aria-label="Fechar menu" onClick={close}>
            <X />
          </button>
        </div>
        <nav>
          {navigation.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={close}>
              <span>0{i + 1}</span>
              {n.label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <p>
          {company.address}
          <br />
          {company.neighborhood}
        </p>
      </dialog>
    </>
  );
}
