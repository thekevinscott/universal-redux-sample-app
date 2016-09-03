// @flow
/*
 * This hydrates a given assets payload
 * and a store on the client.
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
//import Helmet from 'react-helmet';

const VENDOR_SCRIPTS = [];
/**
 * Component to render HTML on the server, wrapping
 * the string output of the route component.
 */
class Html extends Component {
  props: {
    assets: Object,
    component: any,
    store: Object,
  }

  render() {
    const {
      assets,
      component,
      store,
    } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    //const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* production only - print out stylesheets */}
          {Object.keys(assets.styles).map((style, key) => (
            <link
              href={assets.styles[style]}
              key={key}
              media="screen"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
            )
          )}

          {/* development only - prevent flash of missing stylesheet */}
          {/* kevin - this isn't working, just yet */}
          {
            //Object.keys(assets.styles).length === 0 ? (
              //<style
                //dangerouslySetInnerHTML={{
                  //__html: require('shared/stylesheets/main.scss')._style,
                //}}
              ///>
            //) : null
          }
          {VENDOR_SCRIPTS.map((script, key) => (
            <script src={script} key={key} />
          ))}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}

export default ({
  assets,
  component,
  store,
}: {
  assets: any,
  component: any,
  store: any,
}) => {
  const domString = ReactDOM.renderToString(
    <Html
      assets={assets}
      component={component}
      store={store}
    />
  );
  return `<!doctype html>\n${domString}`;
};
