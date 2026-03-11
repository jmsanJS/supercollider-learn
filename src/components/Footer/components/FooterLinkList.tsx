import styles from "./FooterLinkList.module.css";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
};

type FooterLinkListProps = {
  title: string;
  links: FooterLink[];
};

export default function FooterLinkList({ title, links }: FooterLinkListProps) {
  return (
    <div>
      <div className={styles.footer_col_title}>{title}</div>
      <ul className={styles.footer_link_list}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            {link.external ? (
              <a
                className={styles.footer_ext_link}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon && <span className={styles.social_icon}>{link.icon}</span>}
                {link.label}
                <span className={styles.ext_icon}>↗</span>
              </a>
            ) : (
              // Internal Link
              <Link href={link.href} className={styles.footer_nav_btn}>
                {link.icon && <span className={styles.social_icon}>{link.icon}</span>}
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}