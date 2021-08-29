import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';
import Features from '../components/Features';

const RentalPackages = props => {
  const rentalPackages = props.data.rentalPackages.edges;
  const { intro } = props.data;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-teams">
      <SEO title="Rental packages" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-5">
              <h1 dangerouslySetInnerHTML={{ __html: intro.frontmatter.title }} />
            </div>
            <div className="col-12 col-md-7 position-relative">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container pb-4">
        <div className="row">
          {rentalPackages.map(edge => (
            <div key={edge.node.id} className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">          
                  {edge.node.frontmatter.image && (
                    <div className="card-content-image col-12 mb-2 align-items-end row">
                      <img alt={`photo of ${edge.node.frontmatter.title}`} src={edge.node.frontmatter.image} />
                    </div>
                  )}
                  <h2 className="order-2 order-sm-1">{edge.node.frontmatter.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: edge.node.html }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Call showButton />
      </div>
      
      <Features showDetails />

    </Layout>
  );
};

export const query = graphql`
  query RentalPackagesQuery {
    rentalPackages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/rental-packages\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            image
          }
          html
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(rental-packages.md)/"}) {
      html
      frontmatter {
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
        title
      }
    }
  }
`;

export default RentalPackages;
