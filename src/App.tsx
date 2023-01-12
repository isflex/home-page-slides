import React from 'react'
import Iframe from 'react-iframe'
// import { Helmet } from 'react-helmet'
// import parse, { HTMLReactParserOptions, Element, domToReact, htmlToDOM } from 'html-react-parser';
// import htmlStatic from '../public/about.html';

// console.log(domToReact);
// console.log(htmlToDOM);

// const trimNodeNamesArray = ['!doctype', 'html', 'body', 'head']
// const removeNodeNamesArray = ['title', 'meta']

// const optionsHead: HTMLReactParserOptions = {
//   replace: (domNode) => {
//     if (domNode instanceof Element && removeNodeNamesArray.includes(domNode.name) ) {
//       return <></>
//     }
//     if (domNode instanceof Element && domNode.name === 'style' && domNode.children.length) {
//       return (
//         <Helmet>
//           <style>
//             {domToReact(domNode.children, optionsHead)}
//           </style>
//         </Helmet>
//       )
//     }
//   }
// };

// const optionsBody: HTMLReactParserOptions = {
//   replace: (domNode) => {
//     if (domNode instanceof Element && trimNodeNamesArray.includes(domNode.name) && domNode.children.length) {
//       return (
//         <>
//           {domToReact(domNode.children, optionsBody)}
//         </>
//       )
//     }
//   }
// };

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

const App = () => (
  <iframe
    src='http://local.flexiness.com:4008'
    allowTransparency={true}
    width="100%"
    height={`${height}`}
    id="slide_about"
    className=""
    sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"
    style={{ 
      backgroundColor : 'transparent',
      position: 'relative',
      zIndex: '1',
      width: '100%',
      height: `${height}px`
    }} 
  />
  // <div style={{ width: '100%',  height: `${height}px`}}>
  //   <iframe
  //     src='http://local.flexiness.com:4008'
  //     allowTransparency={true}
  //     width="100%"
  //     height={`${height}`}
  //     id="slide_about"
  //     className=""
  //     sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"
  //     style={{ 
  //       backgroundColor : 'transparent',
  //       position: 'absolute',
  //       zIndex: '1',
  //       width: '100%',
  //       height: `${height}px`
  //     }} 
  //   />
  //   <div
  //     style={{
  //       backgroundImage: `url(https://avatars1.githubusercontent.com/u/3993388?v=4)`,
  //       backgroundPosition: 'center',
  //       backgroundSize: 'cover',
  //       backgroundRepeat: 'no-repeat',
  //       position: 'absolute', 
  //       zIndex: '0',
  //       width: '100%',
  //       height: `${height}px`
  //     }} 
  //   />
  // </div>
)

export default App