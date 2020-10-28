import { css } from "styled-components";
import "typeface-dm-sans";
import "typeface-dm-serif-display";

export const dmSerifDisplayStack =
  '"DM Serif Display", "Iowan Old Style", "Apple Garamond", Baskerville, "Times New Roman", "Droid Serif", Times, "Source Serif Pro", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const dmSansStack =
  '"DM Sans", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const siteTitle = css`
  font-family: ${dmSerifDisplayStack};
  font-size: 2.3em;
  font-weight: 900;
  line-height: 1.1;

  @media (min-width: 32em) {
    font-size: 2.7em;
  }

  @media (min-width: 42em) {
    font-size: 3.4em;
  }
`;

export const pageTitle = css`
  font-family: ${dmSerifDisplayStack};
  font-size: 2.3em;
  font-weight: 900;
  line-height: 1.1;

  @media (min-width: 32em) {
    font-size: 2.6em;
  }

  @media (min-width: 42em) {
    font-size: 3em;
  }
`;

export const sectionHeading = css`
  font-family: ${dmSerifDisplayStack};
  position: relative;
  margin-top: 1.5em;
  font-weight: normal;
  font-size: 2em;
  line-height: 1.2;
`;

export const subHeading = css`
  font-weight: bold;
  font-size: 1.8em;
  line-height: 1.2;
`;

export const bodyCopy = css`
  font-family: ${dmSansStack};
  font-weight: 300;
  line-height: 1.5;
`;
