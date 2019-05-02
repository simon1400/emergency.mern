import React from 'react';
import Page from '../../components/page';

export default () => (
  <Page id="homepage">
    <div className="uk-container">
			<div className="uk-grid uk-child-width-1-1" uk-grid="">
				<div>
					<form>
						<fieldset className="uk-fieldset">

							<legend className="uk-legend">Nazev otaznika</legend>

							<div className="uk-margin">
								<input className="uk-input" type="text" placeholder="Nazev" />
							</div>

							<hr />

							<h3 className="uk-legend">Otazka 1</h3>

				        <div className="uk-margin">
				            <input className="uk-input" type="text" placeholder="Otazka" />
				        </div>

								<button className="uk-button uk-button-text"> + Add description</button>

								<div className="uk-margin">
										<textarea className="uk-textarea" rows="5" placeholder="Textarea"></textarea>
								</div>

								<hr />


							<h3 className="uk-legend">Odpoved</h3>

							<div className="uk-grid uk-grid-small" uk-grid>
								<div className="uk-margin uk-width-4-5">
				          <input className="uk-input" type="text" placeholder="Odpoved" />
				        </div>
								<div className="uk-width-1-5 uk-flex uk-flex-between">
				          <input className="uk-input" type="text" placeholder="Body" />
									<span>minus</span>
				        </div>
							</div>

							<button className="uk-button uk-button-text"> + Add answer</button>

							<hr />



					<button className="uk-button uk-button-primary uk-align-right">Next question</button>
					<button className="uk-button uk-button-primary">Save</button>

				    </fieldset>
					</form>
				</div>
			</div>
		</div>
  </Page>
);
