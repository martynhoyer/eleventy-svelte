const html = String.raw;
const css = String.raw;

module.exports = async function (data) {
  const {
    content,
    title: pageTitle,
    page: { url },
  } = data;

  const svelteCss = this.getSvelteCssForPage(url);
  const svelteHead = this.getSvelteHeadForPage(url);

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${pageTitle}</title>
        <style>
          ${globalStyles()}
        </style>
        <style>
          ${svelteCss}
        </style>
        ${svelteHead}
      </head>
      <body>
        <p>[base.11ty.js]</p>
        ${content}
      </body>
    </html>
  `;
};

const globalStyles = () => css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }
`;
