import * as React from "react"
import Header from "../Header"
import "./style.scss"

interface Prop {}

const BasicLayout: React.FunctionComponent<Prop> = props => {
  const { children } = props
  return (
    <div className="body-container">
      <Header siteTitle="enpitsuLin's blog" />
      {children}
    </div>
  )
}

export default BasicLayout
