import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

const Features = props => {
  const data = useStaticQuery(graphql`
    query FeaturesQuery {
      features: allFeaturesJson {
        edges {
          node {
            id
            title
            description
            image
          }
        }
      }
    }
  `);
  const features = data.features.edges;
  console.log(features)
  return (
    <>
      {features.length > 0 && (
        <div className="strip strip-grey">
          <div className="container pt-6 pb-6 pt-md-10 pb-md-10">
            <div className="row justify-content-center">
              {features.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="feature">
                    {node.image && (
                      <div className="feature-image">
                        <img src={node.image} />
                      </div>
                    )}
                    <h2 className="feature-title">{node.title}</h2>
                    <div className="feature-content">{node.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Features