import * as React from "react"

interface Props {
  htmlAttributes: React.HTMLAttributes<HTMLHtmlElement>
  bodyAttributes: React.HTMLAttributes<HTMLBodyElement>
  headComponents: any
  preBodyComponents: any[]
  body: string
  postBodyComponents: any[]
}

const HTML: React.FunctionComponent<Props> = props => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
)
export default HTML
