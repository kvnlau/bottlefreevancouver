import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const SubFooter = props => {
  const data = useStaticQuery(graphql`
    query SubFooterQuery {
      configJson {
        footer {
          copyright_text
          copyright_link
        }
      }
    }
  `);
  return (
    <div className="sub-footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sub-footer-inner">
              <div className="copyright">(778) 919-0018 | <a href="mailto:info@bottlefreevancouver.com">info@bottlefreevancouver.com</a></div>
              <div className="copyright">
                <span>{data.configJson.footer.copyright_text}</span>
                {data.configJson.footer.copyright_link && (
                  <a href={data.configJson.footer.copyright_link}>{data.configJson.footer.copyright_link}</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
