"use client";

import { useState, useRef } from "react";
import fetch from "isomorphic-unfetch";
import layoutStyles from "./layout.module.css";
import styles from "./contact-us.module.css";

export function ContactUs() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState({
    isButtonEnabled: true,
    buttonText: "Send",
  });

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    setState({
      isButtonEnabled: false,
      buttonText: "Sending...",
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        message: messageRef.current?.value,
      }),
    };

    try {
      await fetch("/api/contact", options);
      setState({
        isButtonEnabled: false,
        buttonText: "Thank you!",
      });
    } catch {
      setState({
        isButtonEnabled: true,
        buttonText: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={layoutStyles.container}>
        <div className={styles.innerWrapper}>
          <h2>Contact Us</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <input
                required
                ref={nameRef}
                className={styles.textInput}
                type="text"
                placeholder="Name"
              />
              <input
                required
                ref={emailRef}
                className={styles.textInput}
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <textarea
                required
                ref={messageRef}
                className={styles.textInput}
                style={{ height: "112px" }}
                placeholder="Message"
              />
            </div>
            <div>
              <input
                className={styles.submitButton}
                type="submit"
                disabled={!state.isButtonEnabled}
                value={state.buttonText}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
