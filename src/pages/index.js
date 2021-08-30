import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';
import Features from '../components/Features';

const Home = props => {
  const intro = props.data.intro;
  const site = props.data.site.siteMetadata;
  const rentalPackages = props.data.rentalPackages.edges;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-home">
      <SEO title={site.title} />
      <Helmet>
        <meta
          name="description"
          content="Bottlefree Vancouver supplies environmentally friendly and high quality drinking water to offices in Metro Vancouver."
        />
      </Helmet>

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-5 mb-2 position-relative">
              <h1>{intro.frontmatter.title_display}</h1>
              <Call showButton />
            </div>
            <div className="col-12 col-md-7">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
          </div>
        </div>
      </div>

      {rentalPackages.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6">
            <div className="row justify-content-start">
              {rentalPackages.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-4 mb-1">
                  <div className="service service-summary">
                    <div className="service-content">
                      <h2 className="service-title">
                        <Link to="/rental-packages/">{node.frontmatter.title}</Link>
                      </h2>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link className="button button-primary" to="/rental-packages/">Compare rental packages</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Features />
    </Layout>
  );
};

export const query = graphql`
  query {
    rentalPackages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/rental-packages\/.*/" } }
      sort: { fields: [frontmatter___weight], order: ASC }
      limit: 6
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    intro: markdownRemark(
      fileAbsolutePath: {regex: "/content/index.md/"}
    ) {
        html
        frontmatter {
          image
          intro_image
          intro_image_absolute
          intro_image_hide_on_mobile
          title
          title_display
        }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Home;
