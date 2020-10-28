import { css } from "styled-components";

export const fancyLinkStyles = (
  restingColor,
  hoverColor,
  height = "0.2em",
  paddingOffset = null
) => {
  const backgroundBottomPosition = 100 - paddingOffset;
  return css`
    background-image: linear-gradient(${hoverColor}, ${hoverColor}),
      linear-gradient(${restingColor}, ${restingColor});
    background-size: ${({ isHovered }) =>
      isHovered ? `100% ${height}` : `0% ${height}, 100% ${height}`};
    background-position: 0 ${backgroundBottomPosition}%,
      0 ${backgroundBottomPosition}%;
    transition: background-size 0.2s ease-in-out;
    background-repeat: no-repeat;

    &:hover,
    &:focus {
      background-size: 100% ${height};
    }
  `;
};