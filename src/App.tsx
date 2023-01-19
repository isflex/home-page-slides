import React from 'react'

console.log(`FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOSTNAME : ${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOSTNAME}`)

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

const App = () => (
  <iframe
    src={`${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOSTNAME}`}
    // src={`http://localhost:4008`}
    allowTransparency={true}
    id="slide_about"
    className=""
    sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"
    referrerPolicy="same-origin"
    style={{ 
      backgroundColor : 'transparent',
      position: 'relative',
      zIndex: '1',
      border: 'none',
      width: 'inherit',
      height: `inherit`
    }}
  />

  // <embed
  //   src='http://localhost:4008'
  //   id="slide_about"
  //   className=""
  //   style={{ 
  //     backgroundColor : 'transparent',
  //     position: 'relative',
  //     zIndex: '1',
  //     border: 'none',
  //     width: 'inherit',
  //     height: `inherit`
  //   }}
  // />

  // <div style={{ width: '100%',  height: `${height}px`}}>
  // <iframe
  //   src={`${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOSTNAME}`}
  //   // src={`http://localhost:4008`}
  //   allowTransparency={true}
  //   id="slide_about"
  //   className=""
  //   sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"
  //   referrerPolicy="same-origin"
  //   style={{ 
  //     backgroundColor : 'transparent',
  //     position: 'relative',
  //     zIndex: '1',
  //     border: 'none',
  //     width: 'inherit',
  //     height: `inherit`
  //   }}
  // />
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