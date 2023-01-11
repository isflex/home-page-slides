---
marp: true
title: Slide Presentation using Marp CLI
description: Flexiness | Home Page | Project Summary
theme: uncover
paginate: true
_paginate: true
---

<!-- class: invert -->

# A Propos

~~~~
You may have seen this screen before. Scroll on to learn more...
~~~~

<style scoped>
h1 {
  letter-spacing: .2em;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0.17em auto 0.8em;
  position: relative;

  line-height: 0.5em;
  padding: 1em;
  border: 2px solid #fff;
  border-left-width: 0;
  border-right-width: 0;
  width: 10vw;
  min-width: 8em;
  text-align: center;

  font-size: 2em;
}
</style>

<!-- This is presenter note. You can write down notes through HTML comment. -->

---

<!-- class: invert -->

![bg](./assets/margritte.jpg)

# <!--fit--> Ceci n'est pas

* a simple project launched with :
  <div id="ubuntu">
  <div id='terminal'>
  <section id="terminal__bar">
  <div id="bar__buttons">
  <button class="bar__button" id="bar__button--exit">&#10005;</button>
  <button class="bar__button">&#9472;</button>
  <button class="bar__button">&#9723;</button>
  </div>
  <p id="bar__user">is@flexiness: ~</p>
  </section>
  <!-- Terminal Body -->
  <section id="terminal__body">
  <div id="terminal__prompt">
  <span id="terminal__prompt--user">is@flexiness:</span>
  <span id="terminal__prompt--location">~</span>
  <span id="terminal__prompt--bling">$</span>
  npx create-react-app mon-app
  </div>
  <div id="terminal__prompt">
  <span id="terminal__prompt--user">is@flexiness:</span>
  <span id="terminal__prompt--location">~</span>
  <span id="terminal__prompt--bling">$</span>
  cd mon-app
  </div>
  <div id="terminal__prompt">
  <span id="terminal__prompt--user">is@flexiness:</span>
  <span id="terminal__prompt--location">~/mon-app</span>
  <span id="terminal__prompt--bling">$</span>
  npm start
  </div>
  <div id="terminal__prompt">
  <span id="terminal__prompt--user">is@flexiness:</span>
  <span id="terminal__prompt--location">~/mon-app</span>
  <span id="terminal__prompt--bling">$</span>
  <span id="terminal__prompt--cursor"></span>
  </div>
  </section>
  </div>
  </div>

* a *one stop solution* to all dev challenges 
  https://nx.dev/concepts/integrated-vs-package-based

* a project that is *baked in* and 100% commited to a chosen tech stack... which will invariably *eject from CRA* or *jail break from OS* another day!


<!-- _color: "#32325d" -->

<style scoped>
h1 {
  letter-spacing: .2em;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0 auto 0;
  position: relative;

  line-height: 1em;
  padding: 0.5em;
  width: 10vw;
  min-width: 8em;
  text-align: center;

  font-size: 2.5em;
}
li > p {
  font-size: 0.8em;
}
a {
  font-size: 0.8em;
  color: #109db9;
  text-decoration: underline;
}
</style>

---

![Marp bg 60%](https://raw.githubusercontent.com/marp-team/marp/master/marp.png)

---

<!-- _backgroundColor: "#123" -->
<!-- _color: "#fff" -->

##### <!--fit--> [Marp CLI](https://github.com/marp-team/marp-cli) + [GitHub Pages](https://github.com/pages) | [Netlify](https://www.netlify.com/) | [Vercel](https://vercel.com/)

##### <!--fit--> 👉 The easiest way to host<br />your Marp deck on the web

---

![bg right 60%](https://icongr.am/octicons/mark-github.svg)

## **[GitHub Pages](https://github.com/pages)**

#### Ready to write & host your deck!

[![Use this as template h:1.5em](https://img.shields.io/badge/-Use%20this%20as%20template-brightgreen?style=for-the-badge&logo=github)](https://github.com/yhatt/marp-cli-example/generate)

---

![bg right 60%](https://icongr.am/simple/netlify.svg?colored)

## **[Netlify](https://www.netlify.com/)**

#### Ready to write & host your deck!

[![Deploy to Netlify h:1.5em](./assets/netlify-deploy-button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yhatt/marp-cli-example)

---

![bg right 60%](https://icongr.am/simple/zeit.svg)

## **[Vercel](https://vercel.com/)**

#### Ready to write & host your deck!

[![Deploy to Vercel h:1.5em](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yhatt/marp-cli-example)

---

### <!--fit--> :ok_hand:

---

![bg 40% opacity blur](https://avatars1.githubusercontent.com/u/3993388?v=4)

### Created by Yuki Hattori ([@yhatt](https://github.com/yhatt))

https://github.com/yhatt/marp-cli-example


<!-- https://github.com/fobabs/ubuntu-terminal -->
<style>
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');

  #ubuntu {
    display: flex;
    justify-content: start;
    align-items: start;
    font-size: 18px;
    margin-bottom: 1em
  }

  #terminal {
    width: auto;
    min-width: 50%;
    font-family: Ubuntu;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.5);
  }

  #terminal__bar {
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    padding: 0 8px;
    box-sizing: border-box;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: linear-gradient(#504b45 0%,#3c3b37 100%);
  }

  #bar__buttons {
    display: flex;
    align-items: center;
  }

  .bar__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-right: 5px;
    font-size: 10px;
    height: 12px;
    width: 12px;
    box-sizing: border-box;
    border: none;
    border-radius: 100%;
    background: linear-gradient(#7d7871 0%, #595953 100%);
    text-shadow: 0px 1px 0px rgba(255,255,255,0.2);
    box-shadow: 0px 0px 1px 0px #41403A, 0px 1px 1px 0px #474642;
  }
  .bar__button:hover {
    cursor: none;
  }
  .bar__button:focus {
    outline: none;
  }
  #bar__button--exit {
    background: linear-gradient(#f37458 0%, #de4c12 100%);
    background-clip: padding-box;
  }

  #bar__user {
    color: #d5d0ce;
    margin-top: 15px;
    margin-left: 6px;
    font-size: 14px;
    line-height: 15px;
  }

  #terminal__body {
    background: rgba(56, 4, 40, 0.9);
    font-family: 'Ubuntu Mono';
    height: calc(100% - 30px);
    padding: 2px 7px 2px;
    margin-top: -1px;
  }

  #terminal__prompt {
    display: flex;
    color: #fff;
  }
  #terminal__prompt--user {
    color: #7eda28;
  }
  #terminal__prompt--location {
    color: #4878c0;
  }
  #terminal__prompt--bling {
    color: #dddddd;
    margin-right: 8px;
  }
  #terminal__prompt--cursor {
    display: block;
    height: 17px;
    width: 8px;
    margin-top: 5px;
    margin-left: 0px;
    animation: blink 1200ms linear infinite;
  }

  @keyframes blink {
    0% {
      background: #ffffff;
    }
    49% {
      background: #ffffff;
    }
    60% {
      background: transparent;
    }
    99% {
      background: transparent;
    }
    100% {
      background: #ffffff;
    }
  }

  @media (max-width: 600px) {
    #terminal {
      max-height: 90%;
      width: 90%;
    }
  }
</style>

