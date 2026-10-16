import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  title?: string;
  link?: string;
}

export function Button({ text, title, link, disabled, ...props }: ButtonProps) {
  const content = text ?? title;

  // Estilização padrão do botão Proffy (verde, texto branco, transição e hover)
  const buttonStyles =
    "w-full h-14 bg-green text-white font-archivo-bold text-base rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-green-hover disabled:bg-button-disabled disabled:text-text-complement disabled:cursor-not-allowed";

  // Se a prop link for informada e o botão não estiver desativado, renderiza como link de navegação
  if (link && !disabled) {
    return (
      <Link to={link} className={buttonStyles}>
        {content}
      </Link>
    );
  }

  // Caso padrão (botão de submit de formulários ou ação comum)
  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {content}
    </button>
  );
}