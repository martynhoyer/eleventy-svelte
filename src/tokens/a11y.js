import styled, { css } from "styled-components";
import { hideVisually } from "polished";

export const focusState = color => css`
  outline: 0.125rem solid ${color};
  outline-offset: 0.25rem;
`;

export const HideVisually = styled.span`
  ${hideVisually};
`;
