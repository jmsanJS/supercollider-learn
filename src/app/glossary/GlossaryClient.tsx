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
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function GlossaryClient() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory>("all");
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const shouldScroll = useRef(false);

  const CATEGORIES: { id: GlossaryCategory; label: string }[] = [
    { id: "all", label: t(lang, "glossary_cat_all") },
    { id: "programming", label: t(lang, "glossary_cat_programming") },
    { id: "audio", label: t(lang, "glossary_cat_audio") },
    { id: "music", label: t(lang, "glossary_cat_music") },
    { id: "supercollider", label: t(lang, "glossary_cat_sc") },
  ];

  const terms = getTermsByCategory(activeCategory, lang);
  const filteredTerms = searchQuery.trim()
    ? terms.filter((item) => {
        const q = searchQuery.toLowerCase();
        return item.term[lang].toLowerCase().includes(q);
      })
    : terms;
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
    setSearchQuery("");
    setActiveTerm(related);
    if (related.category !== activeCategory && activeCategory !== "all") {
      setActiveCategory("all");
    }
  };

  return (
    <section className={styles.section_wrap} aria-label="Glossary">
      <div className={styles.glossary_layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebar_header}>
            <span className={styles.section_label}>
              {t(lang, "glossary_categories_label")}
            </span>
          </div>
          <nav aria-label="Filter by category">
            <ul className={styles.cat_list}>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`${styles.cat_btn} ${activeCategory === cat.id ? styles.active : ""}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActiveTerm(null);
                      setSearchQuery("");
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
          <TerminalHeader title="glossary" desc={t(lang, "glossary_desc")} />

          <div className={styles.search_wrap}>
            <input
              className={styles.search_input}
              type="search"
              placeholder={t(lang, "glossary_search_placeholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTerm(null);
              }}
              aria-label={t(lang, "glossary_search_aria")}
            />
          </div>

          <div className={styles.terms_wrap}>
            <ul className={styles.terms_list} aria-label="Terms list">
              {filteredTerms.length === 0 && (
                <li className={styles.no_results}>
                  {t(lang, "glossary_no_results")} &quot;{searchQuery}&quot;
                </li>
              )}
              {filteredTerms.map((term) => (
                <li key={term.id} id={`term-${term.id}`}>
                  <button
                    className={`${styles.term_item} ${activeTerm?.id === term.id ? styles.active : ""}`}
                    onClick={() => handleSelectTerm(term)}
                    aria-expanded={activeTerm?.id === term.id}
                  >
                    <div className={styles.term_top}>
                      <span className={styles.term_name}>
                        {term.term[lang]}
                      </span>
                      <span className={styles.term_cat}>{term.category}</span>
                      <span className={styles.term_chevron} aria-hidden="true">
                        {activeTerm?.id === term.id ? "▴" : "▾"}
                      </span>
                    </div>

                    {activeTerm?.id === term.id && (
                      <div className={styles.term_detail} role="region">
                        <p className={styles.term_definition}>
                          {term.definition[lang]}
                        </p>

                        {term.related && term.related.length > 0 && (
                          <div className={styles.related_wrap}>
                            <span className={styles.related_label}>
                              {t(lang, "glossary_see_also")}
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
                                  {rel.term[lang]}
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
