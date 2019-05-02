import React from 'react';
import Page from '../../components/page';

export default () => (
  <Page id="homepage">
    <article className="uk-article">
      <div class="uk-container">
  			<div class="uk-grid uk-child-width-1-1 uk-child-width-1-3@s " uk-grid>
          <div class="uk-margin-bottom">
  					<a href="/" class="uk-card uk-card-default uk-card-hover uk-card-body uk-display-block uk-link-reset">
              <h3 class="uk-card-title">Test 1</h3>
          	</a>
  				</div>
          <div class="uk-margin-bottom">
  					<a href="/" class="uk-card uk-card-default uk-card-hover uk-card-body uk-display-block uk-link-reset">
              <h3 class="uk-card-title">Test 2</h3>
          	</a>
  				</div>
          <div class="uk-margin-bottom">
  					<a href="/" class="uk-card uk-card-default uk-card-hover uk-card-body uk-display-block uk-link-reset">
              <h3 class="uk-card-title">Test 3</h3>
          	</a>
  				</div>
  			</div>
  		</div>
    </article>
  </Page>
);
