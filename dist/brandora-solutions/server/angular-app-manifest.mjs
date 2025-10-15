
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
    'index.csr.html': {size: 15871, hash: '03623bee4e0aca70c0e6db50fba6f4916d0beaa715331dd608bcb6dc165c7835', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 15571, hash: '253712e893478acd85cc953f7c8a5f908f9fc141d86f68853965a61c4519d724', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 32050, hash: '5afec404b1675dc95a75b90d5e92e39cd06aa5ca2c5b2490ab342cb6f5101563', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-VKT5DYEL.css': {size: 77701, hash: 'aZAE8b54F9o', text: () => import('./assets-chunks/styles-VKT5DYEL_css.mjs').then(m => m.default)}
  },
};
