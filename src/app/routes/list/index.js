import React from 'react';
import Page from '../../components/page';

export default () => (
  <Page id="homepage">
    <div className="uk-container">
			<div className="uk-grid uk-grid-small uk-margin-medium-bottom" uk-grid="" uk-height-match=".tm-equal-height">
				<div className="uk-width-4-5">
          <div className="uk-margin">
            <form className="uk-search uk-search-default uk-width-1-1">
              <span uk-search-icon=""></span>
              <input className="uk-search-input" type="search" placeholder="Search..." />
            </form>
          </div>
				</div>
				<div className="uk-width-1-5">
					<button className="uk-button uk-button-primary uk-width-1-1 tm-equal-height">Pridat pacienta</button>
				</div>
			</div>
		</div>
    <div className="uk-container">
      <div className="uk-grid uk-child-width-1-1" uk-grid="">
        <div>
          <table className="uk-table uk-table-striped uk-table-hover uk-table-middle uk-margin-bottom">
            <thead>
              <tr>
                <th>Table Heading</th>
                <th>Table Heading</th>
                <th>Table Heading</th>
                <th className="uk-text-right">Table Heading</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Table Data</td>
                <td>Table Data</td>
                <td>Table Data</td>
                <td>
                  <ul className="uk-iconnav uk-flex-right">
                    <li><a href="/" uk-icon="icon: info">icon</a></li>
                    <li><a href="/" uk-icon="icon: file-edit">icon</a></li>
                    <li><a href="/" uk-icon="icon: trash">icon</a></li>
                  </ul>
                </td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
    </div>
  </Page>
);
