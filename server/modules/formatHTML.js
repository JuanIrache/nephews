// Simple html template for SMS notification links

const bodyStyle = [
  `background-color: #ffcb5c`,
  `font-family: sans-serif`,
  `margin: 0`,
  `height: 70vh`,
  `text-align: center`,
  `font-size: 120%`,
  `display: flex`,
  `flex-direction: column`,
  `justify-content: space-around`,
  `align-items: center`,
  `padding: 6rem`
];

module.exports = ({ title, audio, link }) =>
  `
<head>
    <title>nephews</title>
</head>
<body style="${bodyStyle.join(';')}">
    ${title ? `<h1>${title}</h1>` : ''}
    ${
      audio
        ? `<audio controls src="${audio}" style="width:80%;">
                Your browser does not support the audio element.
            </audio>`
        : ''
    }
    ${
      link
        ? `<h1>
                <a style="color:#003146" href="${link.url}">
                    ${link.text}
                </a>
            </h1>`
        : ''
    }
</body>
`.replace(/ {2,}/g, '');
