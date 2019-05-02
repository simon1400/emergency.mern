import React from 'react';
import Page from '../../components/page';

export default () => (
  <Page id="homepage">
    <div className="uk-container">
			<div className="uk-grid uk-child-width-1-1" uk-grid="">
				<div>
					<h1 className="uk-heading-divider uk-text-center">Heading Divider</h1>

					<h3 className="uk-heading-divider">Number 1, Heading question </h3>

					<form>
						<div className="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
	            <label><input className="uk-radio" type="radio" name="radio2" checked /> A</label>
							<label><input className="uk-radio" type="radio" name="radio2" /> Number 1, Heading question</label>
							<label><input className="uk-radio" type="radio" name="radio2" /> Number 1, Heading</label>
							<label><input className="uk-radio" type="radio" name="radio2" /> D</label>
	        	</div>
					</form>
					<progress id="js-progressbar" className="uk-progress" value="10" max="100"></progress>
					<hr />
					<button className="uk-button uk-button-primary uk-align-right">Next</button>
				</div>
			</div>
		</div>
  </Page>
);
