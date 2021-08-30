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
  return (
    <>
      {features.length > 0 && (
        <div className="strip strip-grey">
          <div className="container pt-6 pb-6">
          {props.showDetails && (
              <div className="">
              <h2>Our all-inclusive service package comes with all cooler rentals</h2>
              <ul className="features-details justify-content-start pt-2 pb-2">
                <li><em>FREE</em> initial feasibility visit</li>
                <li><em>FREE</em> standard installation</li>
                <li><em>FREE</em> cartridge changes</li>
                <li>Semi-annual equipment inspection and servicing</li>
                <li>Leak detector with automatic shut-off mechanism</li>
                <li>Free relocation of equipment to a new location</li>
                <li><em>24-hour on call service</em></li>
              </ul>
              </div>
            )}
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