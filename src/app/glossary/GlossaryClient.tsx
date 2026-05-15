"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import type { GlossaryCategory, GlossaryTerm } from "@/types";
import {
  getTermsByCategory,
  getRelatedTerms,
  getTotalByCategory,
} from "@/lib/glossary";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";

const CATEGORIES: { id: GlossaryCategory; label: string; }[] = [
  { id: "all", label: "Todos" },
  { id: "programming", label: "Programación" },
  { id: "audio", label: "Audio" },
  { id: "music", label: "Música" },
  { id: "supercollider", label: "SuperCollider" },
];

export default function GlossaryClient() {
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory>("all");
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);
  const shouldScroll = useRef(false);

  const terms = getTermsByCategory(activeCategory);
  const totals = getTotalByCategory();

  useEffect(() => {
    if (!shouldScroll.current || !activeTerm) return;
    shouldScroll.current = false;
    const el = document.getElementById(`term-${activeTerm.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeTerm]);

  const handleSelectTerm = (term: GlossaryTerm) => {
    setActiveTerm((prev) => (prev?.id === term.id ? null : term));
  };

  const handleRelatedClick = (related: GlossaryTerm) => {
    shouldScroll.current = true;
    setActiveTerm(related);
    if (related.category !== activeCategory && activeCategory !== "all") {
      setActiveCategory("all");
    }
  };

  return (
    <section className={styles.section_wrap} aria-label="Glosario">
      <div className={styles.glossary_layout}>

        <aside className={styles.sidebar}>
          <div className={styles.sidebar_header}>
            <span className={styles.section_label}>Categorías</span>
          </div>
          <nav aria-label="Filtrar por categoría">
            <ul className={styles.cat_list}>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`${styles.cat_btn} ${activeCategory === cat.id ? styles.active : ""}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActiveTerm(null);
                    }}
                    aria-current={activeCategory === cat.id}
                  >
                    <span className={styles.cat_label}>{cat.label}</span>
                    <span className={styles.cat_count}>{totals[cat.id]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className={styles.main}>
          <TerminalHeader title="glossary" desc="Términos y conceptos" />

          <div className={styles.terms_wrap}>
            <ul className={styles.terms_list} aria-label="Lista de términos">
              {terms.map((term) => (
                <li key={term.id} id={`term-${term.id}`}>
                  <button
                    className={`${styles.term_item} ${activeTerm?.id === term.id ? styles.active : ""}`}
                    onClick={() => handleSelectTerm(term)}
                    aria-expanded={activeTerm?.id === term.id}
                  >
                    <div className={styles.term_top}>
                      <span className={styles.term_name}>{term.term}</span>
                      <span className={styles.term_cat}>{term.category}</span>
                      <span className={styles.term_chevron} aria-hidden="true">
                        {activeTerm?.id === term.id ? "▴" : "▾"}
                      </span>
                    </div>

                    {activeTerm?.id === term.id && (
                      <div className={styles.term_detail} role="region">
                        <p className={styles.term_definition}>
                          {term.definition}
                        </p>

                        {term.related && term.related.length > 0 && (
                          <div className={styles.related_wrap}>
                            <span className={styles.related_label}>
                              Ver también:
                            </span>
                            <div className={styles.related_list}>
                              {getRelatedTerms(term).map((rel) => (
                                <span
                                  key={rel.id}
                                  className={styles.related_btn}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRelatedClick(rel);
                                  }}
                                >
                                  {rel.term}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
