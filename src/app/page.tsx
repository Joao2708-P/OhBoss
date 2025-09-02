"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./components/Modal";
import Comments from "./components/comments/comments";
import CommentsCarousel from "./components/comments/CommentsCarousel";
import styles from "./page.module.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const header = document.querySelector<HTMLElement>("header");
      if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function ToggleMenu(): void {
    setMenuOpen((prev) => !prev);
    const html = document.documentElement;
    html.style.overflow = !menuOpen ? 'hidden' : '';
  }
  
  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <a href="#" className={styles.logo}>
          <Image
            width={350}
            height={100}
            alt="logo Oh Boss"
            src="/images/LogoOhboss.png"
          />
        </a>
        <div className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleActive : ""}`} onClick={ToggleMenu}></div>
        <ul className={`${styles.navegacao} ${menuOpen ? styles.navegacaoActive : ""}`}>
          <li><a className={styles.navLink} href="#banner">Inicio</a></li>
          <li><a className={styles.navLink} href="#about">Sobre</a></li>
          <li><a className={styles.navLink} href="#menu">Cardápio</a></li>
          {/* <li><a className={styles.navLink} href="#expert">Chefes</a></li> */}
          <li><a className={styles.navLink} href="#testimonials">Comentários</a></li>
          <li><a className={styles.navLink} href="#contact">Contato</a></li>
        </ul>
      </header>

      {/* Apresentação da página */}
      <section className={styles.banner} id="banner">
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>O melhor que você vai comer!</h2>
          <p className={styles.bannerText}>
            Seja bem-vindo ao nosso restaurante, sintam-se em casa e bom proveito!!
          </p>
          <a href="#menu" className={styles.btn}>Nosso Cardápio</a>
        </div>
      </section>

      {/* Sobre */}
      <section className={styles.about} id="about">
        <div className={styles.row}>
          <div className={styles.col50}>
            <h2 className={styles.titleText}><span>S</span>obre Nós</h2>
            <p>
              Na Ôh Boss Açaí, acreditamos que cada detalhe faz diferença. 
              Por isso, nossa missão vai muito além de servir um açaí: queremos entregar 
              momentos inesquecíveis. Trabalhamos apenas com ingredientes cuidadosamente selecionados, 
              escolhidos pela sua qualidade e frescor, para criar combinações que despertam todos os 
              sentidos.
              Cada taça é preparada com carinho, misturando texturas, sabores e cores que transformam o 
              simples ato de saborear um açaí em uma verdadeira experiência gastronômica. Aqui você 
              encontra opções que agradam a todos os gostos — desde as mais clássicas até as mais 
              ousadas, sempre pensadas para surpreender.
              Mas o que realmente nos diferencia é a forma como cuidamos de cada cliente. 
              Nosso atendimento é próximo, caloroso e cheio de atenção, porque acreditamos que 
              comer bem também significa se sentir acolhido. Ao entrar na Ôh Boss Açaí, você não 
              encontra apenas um espaço para matar a vontade de um bom açaí, mas sim um ambiente onde 
              pode relaxar, se conectar com pessoas queridas e viver momentos únicos.
              Mais do que uma loja de açaí, somos um ponto de encontro de boas energias, 
              boas conversas e boas lembranças. Seja para uma pausa rápida no dia ou para aproveitar 
              sem pressa, aqui você sempre será recebido de braços abertos e com o sabor irresistível 
              que só a Ôh Boss Açaí sabe oferecer.
            </p>
            <a href="#menu" className={styles.btn}>Explorar Cardápio</a>
          </div>
          <div className={styles.col50}>
            <div className={styles.imgBox}>
              <Image width={300} height={100} alt="Sobre Oh Boss" src="/images/LogoFundoPreto.png" />
            </div>
          </div>
        </div>
      </section>

      {/* Cardápio */}
      <section className={styles.menu} id="menu">
        <div className={styles.menuTitleCard}>
          <h2 className={styles.titleCard}><span>C</span>ardápio</h2>
          <p>Confira as opções do nosso Cardápio!</p>
        </div>

        <div className={styles.menuContent}>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/petitgateu.jpg" alt="Petit Gateu" fill />
            </div>
            <div className={styles.menuText}><h3>Petit Gateu</h3></div>
          </div>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/taca_kinderBueno.jpg" alt="Taça Kinder Bueno" fill />
            </div>
            <div className={styles.menuText}><h3>Kinder Bueno</h3></div>
          </div>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/kikat2.jpg" alt="Kit kat" fill />
            </div>
            <div className={styles.menuText}><h3>Kitkat</h3></div>
          </div>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/pistache.jpg" alt="Pistache" fill />
            </div>
            <div className={styles.menuText}><h3>Açaí clássico</h3></div>
          </div>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/confete.jpg" alt="Confete" fill />
            </div>
            <div className={styles.menuText}><h3>Confete</h3></div>
          </div>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/milkshake_de_morango.jpg" alt="Milk Shake de Morango" fill />
            </div>
            <div className={styles.menuText}><h3>Milk Shake de Morango</h3></div>
          </div>
        </div>

        <div className={styles.menuTitle}>
          <a href="#" className={styles.btn} onClick={(e) => { e.preventDefault(); setIsMenuModalOpen(true); }}>Ver tudo</a>
        </div>
      </section>

      <Modal
        open={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        title="Nosso Cardápio Completo"
      >
        <div className={styles.menuContent}>
          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/bannaSplit.jpg" alt="Banana Split" fill />
            </div>
            <div className={styles.menuText}>
              <h3>Banana Split</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Sorvete, banana, calda e toppings.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 24,90</span>
            </div>
          </div>

          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/taca_kinderBueno.jpg" alt="Taça Kinder Bueno" fill />
            </div>
            <div className={styles.menuText}>
              <h3>Taça Kinder Bueno</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Creme, pedaços de Kinder e calda.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 29,90</span>
            </div>
          </div>

          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/milkshake_de_morango.jpg" alt="Milkshake de Morango" fill />
            </div>
            <div className={styles.menuText}>
              <h3>Milkshake de Morango</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Leite, sorvete e morangos selecionados.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 19,90</span>
            </div>
          </div>

          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/pistache.jpg" alt="Pistache" fill />
            </div>
            <div className={styles.menuText}>
              <h3>Pistache</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Açaí com creme de pistache e castanhas.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 27,90</span>
            </div>
          </div>

          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/kitkat.jpg" alt="KitKat" fill />
            </div>
            <div className={styles.menuText}>
              <h3>KitKat</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Açaí, pedaços de KitKat e calda de chocolate.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 25,90</span>
            </div>
          </div>

          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/confete.jpg" alt="Confete" fill />
            </div>
            <div className={styles.menuText}>
              <h3>Confete</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Açaí com confeitos coloridos crocantes.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 22,90</span>
            </div>
          </div>

          <div className={styles.menuBox}>
            <div className={styles.menuImgBox}>
              <Image src="/images/petitgateu.jpg" alt="Petit Gateu" fill />
            </div>
            <div className={styles.menuText}>
              <h3>Petit Gateu</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>Bolo de chocolate com sorvete e calda.</p>
              <span style={{ display: "inline-block", marginTop: 4, fontWeight: 700, color: "#024c1d" }}>R$ 23,90</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Expert */}
      <section className={styles.expert} id="expert">
        <div className={styles.expertVideoWrapper}>
          <div className={styles.expertVideoContainer}>
            <video className={styles.expertVideo} src="/images/OhBossAcai.mp4" autoPlay loop muted playsInline></video>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials} id="testimonials">
        <div className={styles.menuTitle}>
          <h2 className={styles.titleText}>Eles falaram <span>S</span>obre nós</h2>
          <p>Alguns testemunhos do que acharam de nós!</p>
        </div>

        <div className={styles.testimonialsContent}>
          <CommentsCarousel />
        </div>
          <div className={styles.buttonComments}>
              <a
                href="#"
                className={styles.btn}
                onClick={(e) => { e.preventDefault(); setIsCommentModalOpen(true); }}>
                Comentar
              </a>
          </div>
      </section>

      <Modal
        open={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        title="Deixe seu comentário"
      >
        <Comments onSubmitted={() => setIsCommentModalOpen(false)} />
      </Modal>

      {/* Contato */}
      <section className={styles.contact} id="contact">
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.862455413307!2d-47.05432168447698!3d-22.89750278495701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b5907d8c1d53%3A0xd1a5ff3da9c4ab54!2sAv.%20Eng.%20Roberto%20Mange%2C%20110%20-%20Jardim%20Leonor%2C%20Campinas%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1693449999999!5m2!1spt-BR!2sbr"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Ôh Boss Açaí"
        />
      </section>


      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 João Guilherme — <a href="#banner" className={styles.footerLink}>Oh Boss Açaí</a>
        </p>
      </div>
    </div>
  );
}
