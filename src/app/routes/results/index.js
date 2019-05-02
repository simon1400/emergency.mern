import React from 'react';
import Page from '../../components/page';

export default () => (
  <Page id="homepage">
    <article className="uk-article">
      <div class="uk-container">
  			<div class="uk-grid uk-child-width-1-1 uk-child-width-1-3@s " uk-grid>
  				<div class="uk-margin-bottom">
  					<a href="/" class="uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small uk-display-block uk-link-reset">
              <h3 class="uk-card-title">Test 1</h3>
              <div className="uk-child-width-1-2 uk-grid" uk-grid>
                <div><p className="uk-article-meta uk-text-left">Date: 04.04.2004 15:00</p></div>
                <div className="uk-text-right"><p className="uk-article-meta">Results: <span class="uk-badge">3</span></p></div>
              </div>
          	</a>
  				</div>
          <div class="uk-margin-bottom">
  					<a href="/" class="uk-card uk-card-default uk-card-hover uk-padding-small uk-card-body uk-display-block uk-link-reset">
              <h3 class="uk-card-title">Test 1</h3>
              <div className="uk-child-width-1-2 uk-grid" uk-grid>
                <div><p className="uk-article-meta uk-text-left">Date: 04.04.2004 15:00</p></div>
              <div className="uk-text-right"><p className="uk-article-meta uk-text-warning">Pokracovat</p></div>
              </div>
          	</a>
  				</div>
  			</div>
  		</div>
    </article>
  </Page>
);
