"use client";

import { useState, useRef } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import { Container } from "@/components";
import { rem, screens } from "@/lib/utils";

export default function ContactUs() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const [state, setState] = useState({
    isButtonEnabled: true,
    buttonText: "Send",
  });

  const handleSubmit = async (event) => {
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
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
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
    <Wrapper>
      <Container>
        <InnerWrapper>
          <h2>Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <div>
              <TextInput
                ref={nameRef}
                type="text"
                required="required"
                placeholder="Name"
              />
              <TextInput
                ref={emailRef}
                type="email"
                required="required"
                placeholder="Email"
              />
            </div>
            <div>
              <TextInput
                ref={messageRef}
                as="textarea"
                css="height: 112px;"
                required="required"
                placeholder="Message"
              />
            </div>
            <div>
              <SubmitButton
                type="submit"
                disabled={state.isButtonEnabled ? "" : "disabled"}
                value={state.buttonText}
              />
            </div>
          </Form>
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: hsla(47, 21%, 92%, 0.5);
`;

const InnerWrapper = styled.div`
  padding-top: ${rem(16)};
  padding-right: ${rem(6)};
  padding-bottom: ${rem(16)};
  padding-left: ${rem(6)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 0;

  @media (min-width: ${screens.sm}) {
    flex-direction: row;

    > * {
      margin-right: ${rem(2)};
      flex: 1 1 305px;
    }
  }
`;

const TextInput = styled.input`
  width: 100%;
  margin-bottom: ${rem(2)};
  padding: ${rem(2)} ${rem(4)};
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const SubmitButton = styled.input`
  width: 100%;
  padding: ${rem(2)} ${rem(4)};
  color: #333;
  font-weight: 500;
  background-color: transparent;
  border: 3px solid #333;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.025);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (min-width: ${screens.sm}) {
    width: auto;
  }
`;
