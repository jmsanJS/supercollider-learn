import { Metadata } from "next";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "SC Learn es una plataforma para introducirte a SuperCollider desde el navegador, sin instalaciones.",
};

const steps = [
  {
    num: "01",
    title: "Osciladores y formas de onda",
    desc: (
      <>
        Todo empieza por{" "}
        <span className={styles.concept}>la generación de sonido</span>.
        Trabajarás con <span className={styles.term}>SinOsc</span> (onda
        sinusoidal pura), <span className={styles.term}>Saw</span> (diente de
        sierra) y <span className={styles.term}>Pulse</span> (onda cuadrada).
        Aprenderás a controlar{" "}
        <span className={styles.concept}>frecuencia</span> y{" "}
        <span className={styles.concept}>amplitud</span>, los dos parámetros
        fundamentales de cualquier señal.
      </>
    ),
  },
  {
    num: "02",
    title: "Ruido",
    desc: (
      <>
        <span className={styles.term}>WhiteNoise</span>,{" "}
        <span className={styles.term}>PinkNoise</span> y{" "}
        <span className={styles.term}>BrownNoise</span> son señales de ruido con
        distinto <span className={styles.concept}>carácter espectral</span>:
        desde el blanco estridente hasta el marrón grave y difuso.
      </>
    ),
  },
  {
    num: "03",
    title: "Filtros",
    desc: (
      <>
        Un filtro moldea el timbre dejando pasar unas frecuencias y atenuando
        otras. <span className={styles.term}>LPF</span> (paso-bajo),{" "}
        <span className={styles.term}>HPF</span> (paso-alto) y{" "}
        <span className={styles.term}>BPF</span> (paso-banda) son la base de la{" "}
        <span className={styles.concept}>síntesis substractiva</span>: partir de
        un sonido y esculpirlo hasta el timbre deseado.
      </>
    ),
  },
  {
    num: "04",
    title: "Envolventes",
    desc: (
      <>
        Un sonido existe en el tiempo: tiene inicio, evolución y cierre.{" "}
        <span className={styles.term}>Env</span> te permite definir esa
        trayectoria. Trabajarás con el modelo{" "}
        <span className={styles.concept}>ADSR</span> (Attack, Decay, Sustain,
        Release) y otros perfiles. Las envolventes no solo controlan amplitud,
        pueden aplicarse a cualquier parámetro del sonido.
      </>
    ),
  },
  {
    num: "05",
    title: "Modulación",
    desc: (
      <>
        Cuando un oscilador controla el parámetro de otro, nace la{" "}
        <span className={styles.concept}>modulación</span>.{" "}
        <span className={styles.concept}>FM</span> (modulación de frecuencia) y{" "}
        <span className={styles.concept}>AM</span> (modulación de amplitud)
        permiten construir timbres complejos y en movimiento a partir de
        componentes simples. Es uno de los saltos conceptuales más importantes
        en síntesis de audio.
      </>
    ),
  },
  {
    num: "06",
    title: "Efectos y espacio",
    desc: (
      <>
        <span className={styles.term}>FreeVerb</span> añade reverberación,{" "}
        <span className={styles.term}>DelayN</span> introduce retardos
        controlados y <span className={styles.term}>Pan2</span> posiciona la
        señal en el campo estéreo. Estas son herramientas que transforman un
        evento sonoro en una experiencia espacial.
      </>
    ),
  },
];

export default function About() {
  return (
    <div className={styles.wrap}>
      <TerminalHeader title="about" desc="acerca de SC Learn" />

      <div className={styles.hero}>
        <div className={styles.hero_prompt}>
          <span className={styles.prompt_sym}>~$</span>
          <h1 className={styles.hero_title}>¿Qué es SC Learn?</h1>
        </div>
        <p className={styles.hero_sub}>
          SC Learn es una plataforma para dar los primeros pasos en{" "}
          <strong>SuperCollider</strong> desde el navegador, sin instalar nada.
          Está pensada para músicos con curiosidad por la programación y para
          programadores con interés en la síntesis de audio: gente que ya tiene
          un pie en uno de los dos mundos y quiere construir puentes hacia el
          otro.
          <br />
          <br />
          SuperCollider es un entorno para{" "}
          <span className={styles.concept}>
            síntesis de audio en tiempo real
          </span>{" "}
          y <span className={styles.concept}>composición algorítmica</span>, en
          uso activo desde 1996 en música electroacústica, live coding e
          investigación sonora. Este sitio es una introducción — no un sustituto
          del software real.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>El camino de aprendizaje</div>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.step_num}>{s.num}</span>
              <div className={styles.step_content}>
                <div className={styles.step_title}>{s.title}</div>
                <div className={styles.step_desc}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>Una aclaración importante</div>
        <div className={styles.notice}>
          <strong>SC Learn no ejecuta SuperCollider.</strong> El servidor de
          síntesis real (<code>scsynth</code>) no corre en el navegador. El
          audio que escuchas es una aproximación construida con{" "}
          <strong>Tone.js</strong> que modela el comportamiento de los UGens de
          los ejercicios — funcionalmente válida para aprender, pero no idéntica
          a la implementación real.
          <br />
          <br />
          Los ejercicios cubren un subconjunto acotado del lenguaje. El objetivo
          no es la exhaustividad sino la comprensión de los principios. Una vez
          asentadas las bases aquí, el siguiente paso es instalar SuperCollider
          y trabajar directamente con <code>sclang</code>.
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>
          Recursos oficiales de SuperCollider
        </div>
        <div className={styles.links}>
          <a
            href="https://supercollider.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ext_link}
          >
            <span className={styles.link_label}>Sitio oficial</span>
            <span className={styles.link_url}>supercollider.github.io</span>
          </a>
          <a
            href="https://docs.supercollider.online"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ext_link}
          >
            <span className={styles.link_label}>Documentación</span>
            <span className={styles.link_url}>docs.supercollider.online</span>
          </a>
          <a
            href="https://github.com/supercollider/supercollider"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ext_link}
          >
            <span className={styles.link_label}>GitHub</span>
            <span className={styles.link_url}>
              github.com/supercollider/supercollider
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
