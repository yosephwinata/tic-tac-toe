import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* Section 1: Global variables */
:root{
  --color-dark-cyan: rgba(32, 137, 132, 1);
  --color-cyan: #31C3BD;
  --color-light-cyan: #65E9E4;
  --color-dark-yellow: rgba(197, 139, 30, 1);
  --color-yellow: #F2B137;
  --color-light-yellow: #FFC860;
  --color-dark-navy: #1A2A33;
  --color-semi-dark-navy: #1F3641;
  --color-gray: #A8BFC9;
  --color-light-gray: #D8E8ED;

  --weight-medium: 500;
  --weight-bold: 700;
}

/* Section 2: Generic CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  /* Change the default font-size to 10px */
  /* Browser's default font-size is 16px */
  /* So, 10px / 16px = 0.625 = 62.5% */
  font-size: 62.5%;
}

button {
  cursor: pointer;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

*[hidden] {
  display: none;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  margin: 0;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Section 3: Project-specific global styles */
body {
  font-family: 'Outfit', sans-serif;
  background-color: var(--color-dark-navy);
}
`;

export default GlobalStyles;
