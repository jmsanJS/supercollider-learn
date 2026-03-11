import HomeInfoCard from "@/components/HomeInfoCard/HomeInfoCard";
import styles from "./page.module.css";

export default function Home() {
  const cards = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M7.557 2.066A.75.75 0 0 1 8 2.75v10.5a.75.75 0 0 1-1.248.56L3.59 11H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.59l3.162-2.81a.75.75 0 0 1 .805-.124ZM12.95 3.05a.75.75 0 1 0-1.06 1.06 5.5 5.5 0 0 1 0 7.78.75.75 0 1 0 1.06 1.06 7 7 0 0 0 0-9.9Z" />
          <path d="M10.828 5.172a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
        </svg>
      ),
      label: "Sonido real",
      desc: "Gracias a la librería Tone.js, puedes escuchar el resultado de cada línea de código al instante.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M7.25 3.688a8.035 8.035 0 0 0-4.872-.523A.48.48 0 0 0 2 3.64v7.994c0 .345.342.588.679.512a6.02 6.02 0 0 1 4.571.81V3.688ZM8.75 12.956a6.02 6.02 0 0 1 4.571-.81c.337.075.679-.167.679-.512V3.64a.48.48 0 0 0-.378-.475 8.034 8.034 0 0 0-4.872.523v9.268Z" />
        </svg>
      ),
      label: "Progresivo",
      desc: "Ejercicios ordenados de menor a mayor dificultad. De manera gradual irás descubriendo diferentes UGens (Unit Generators), que son los responsables de la producción y manipulación del sonido.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
      ),
      label: "Sin crear cuenta",
      desc: "Esta es una plataforma de aprendizaje donde no registramos ninguna información de nuestros usuarios, así que no es necesario que crees una cuenta para guardarlo.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M12 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1ZM6.5 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6ZM2 9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9Z" />
        </svg>
      ),
      label: "Tu progreso",
      desc: "Tus avances se registran localmente en tu navegador. Comienza los ejercicios donde los dejaste.",
    },
  ];

  return (
    <div className={styles.section_wrap}>
      <div className={styles.terminal_header}>
        <span className={`${styles.th_dot} ${styles.r}`} />
        <span className={`${styles.th_dot} ${styles.y}`} />
        <span className={`${styles.th_dot} ${styles.g}`} />
        <span className={styles.th_title}>sound.sc</span>
      </div>
      <div className={styles.terminal_section}>
        <div className={styles.t_prompt}>
          <span className={styles.prompt_sym}>~$</span>
          <p className={styles.t_title}>
            SuperCollider
            <br />
            <span className={styles.typewriter}>Interactivo</span>
          </p>
        </div>
        <p className={styles.t_sub}>
          Aprende síntesis de audio escribiendo código real.
          <br />
          Sin instalaciones. Directo en tu navegador.
        </p>
      </div>

      <div className={styles.cards_grid}>
        {cards.map((c, i) => (
          <HomeInfoCard key={i} icon={c.icon} label={c.label} desc={c.desc} />
        ))}
      </div>
    </div>
  );
}
