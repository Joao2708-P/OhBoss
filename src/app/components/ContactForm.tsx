"use client";

import { useState, FormEvent } from "react";
import styles from "./contactForm.module.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    // Aqui você pode enviar para uma API/serviço
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h3 className={styles.contactTitle}>Enviar mensagem</h3>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputBox}>
        <textarea
          placeholder="Sua mensagem"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button className={styles.submitBtn} type="submit">Enviar</button>
      {submitted && (
        <p style={{ marginTop: 12, color: "#0a7f2e" }}>
          Mensagem enviada! Obrigado pelo contato.
        </p>
      )}
    </form>
  );
}


