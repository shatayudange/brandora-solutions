
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1233, hash: '3a93bfef4dd05b58f6db03f72fbce884f1ed826f4a9d006292f20db7f71c4bcf', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1014, hash: '8b9d56015506df07fc1d060c97c9643b5ee86d39de0bdc01a8dd6de0191b8475', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 15304, hash: 'a79c482c71a77cb5a13c029b74d71934dc9c5434bbc0ac097005e5800a0c44bd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LLQBFUVG.css': {size: 77434, hash: 'Yd4iZLw5TlA', text: () => import('./assets-chunks/styles-LLQBFUVG_css.mjs').then(m => m.default)}
  },
};
