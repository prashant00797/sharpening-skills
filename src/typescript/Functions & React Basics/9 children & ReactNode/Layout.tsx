/**
 Scenario
You are building layout components for the AI chat app 
— a Card wrapper, a Modal, and a Section with a heading and body. 
Each component wraps content passed between its tags.

 */

import { ReactElement, ReactNode } from "react";

// 1. Card — wraps any content, has an optional title
type CardProps = {
  title?: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

// 2. Modal — has children for body content, and a footer (also ReactNode)
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  footer?: ReactNode; // optional — renders below the content
};

export function Modal({ isOpen, onClose, children, footer }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <button onClick={onClose}>X</button>

      <div className="modal__body">{children}</div>
      {footer && <div className="modal__footer">{footer}</div>}
    </div>
  );
}

// 3. Section — accepts a heading string and children
//    heading is REQUIRED, children is REQUIRED
type SectionProps = {
  heading: string;
  children: ReactNode;
};

export function Section({ heading, children }: SectionProps) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
