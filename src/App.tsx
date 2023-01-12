import React from 'react'
import { Helmet } from 'react-helmet'
import { Marp } from '@marp-team/marp-react'
import parse, { HTMLReactParserOptions, Element, domToReact, htmlToDOM } from 'html-react-parser';
import htmlStatic from '../public/about.html';
import markdown from './marp/about.md';

// console.log(domToReact);
// console.log(htmlToDOM);

const trimNodeNamesArray = ['!doctype', 'html', 'body', 'head']
const removeNodeNamesArray = ['title', 'meta']

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && removeNodeNamesArray.includes(domNode.name) ) {
      return <></>
    }
    if (domNode instanceof Element && domNode.name === 'style' && domNode.children.length) {
      return (
        <Helmet>
          <style>
            {domToReact(domNode.children, options)}
          </style>
        </Helmet>
      )
    }
    if (domNode instanceof Element && trimNodeNamesArray.includes(domNode.name) && domNode.children.length) {
      return (
        <>
          {domToReact(domNode.children, options)}
        </>
      )
    }
  }
};

// const markdown = parse(htmlStatic, options)

const App = () => (
  <Marp markdown={markdown} />
)


export default App