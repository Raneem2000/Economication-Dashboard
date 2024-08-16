import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 0.9rem 1.9rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1rem 2.4rem;
    font-weight: 500;
    width: 220px;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  cancelCalender: css`
    color: #afa9b4;
    background: #fdf7ff;
    border: 2px solid #e1e3e6;
    &:focus {
      outline: none;
    }
  `,
  darkpurble: css`
    background-color: #5c2d91;
    border: 2px solid #5c2d91;
    color: #fff;
    &:hover {
      background-color: #673ab7;
      border: 2px solid #673ab7;
    }
  `,
  lightLavender: css`
    color: #afa9b4;
    background: #f5eefa;
    border: none;

    &:hover {
      background-color: #fff;
      color: #7a5aa5;
      font-weight: bold;
      border: 3px solid #7a5aa5;
    }

    ${({ isActive }) =>
      isActive &&
      css`
        background-color: #fff;
        color: #7a5aa5;
        font-weight: bolder;
        border: 3px solid #7a5aa5;
        opacity: 0.7;
      `}
  `,
  puple: css`
    color: #fff;
    background-color: #5c2d91;
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm) ${(props) => sizes[props.size]} ${(props) => variations[props.variation]};
`;

Button.defaultProps = {
  variation: "lightLavender",
  size: "medium",
};

export default Button;
