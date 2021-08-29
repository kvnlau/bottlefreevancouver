import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

const WhyBottlefree = props => {
  const whyBottlefree = props.data.whyBottlefree.edges;
  const { intro } = props.data;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-services">
      <SEO title="Why go Bottlefree?" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-5">
              <h1 dangerouslySetInnerHTML={{ __html: intro.frontmatter.title_display }} />
            </div>
            <div className="col-12 col-md-7 position-relative">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-6">
        <div className="row">
          {whyBottlefree.map(edge => (
            <div key={edge.node.id} className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>{edge.node.frontmatter.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: edge.node.html }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query WhyBottlefreeQuery {
    whyBottlefree: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/why-go-bottlefree\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
          html
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(why-go-bottlefree.md)/"}) {
      html
      frontmatter {
        title
        title_display
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
      }
    }
  }
`;

export default WhyBottlefree;
