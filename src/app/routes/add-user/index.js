import React from 'react';
import Page from '../../components/page';

export default () => (
  <Page id="homepage">
    <div className="uk-container">
			<div className="uk-grid uk-child-width-1-1" uk-grid="">
				<form className="uk-form-stacked">

			    <div className="uk-margin">
		        <label className="uk-form-label" htmlFor="form-stacked-text">Text</label>
		        <div className="uk-form-controls">
		            <input className="uk-input uk-form-width-large" id="form-stacked-text" type="text" placeholder="Some text..." />
		        </div>
			    </div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Text</label>
						<div className="uk-form-controls">
		          <input className="uk-input uk-form-width-large" type="text" placeholder="Large" />
		        </div>
			    </div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Text</label>
						<div className="uk-form-controls">
		          <input className="uk-input uk-form-width-large" type="text" placeholder="Large" />
		        </div>
			    </div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Text</label>
						<div className="uk-form-controls">
		          <input className="uk-input uk-form-width-large" type="text" placeholder="Large" />
		        </div>
			    </div>

					<div className="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
	          <label><input className="uk-checkbox" type="checkbox" checked="checked" /> Test 1</label>
					<label><input className="uk-checkbox" type="checkbox" /> Test 2</label>
	        </div>

					<button className="uk-button uk-button-primary">Ulozit</button>

				</form>
			</div>
		</div>
  </Page>
);
