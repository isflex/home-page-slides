import React from 'react'

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