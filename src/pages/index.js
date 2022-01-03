import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Amod Shinde"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <img style={{ margin: 0 }} src="./amodshinde.png" alt="Amod Shinde" />
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my website. Connect with me on <a target="_" href="https://www.linkedin.com/in/amod-shinde/"> LinkedIn </a></p>
          {/* or  <a target="_" href="./cv.pdf" download>Download my CV.</a> */}
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>

      </Layout>
    )
  }
}

export default IndexPage
