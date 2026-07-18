
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
    'index.csr.html': {size: 15871, hash: 'f83eef9dbd700a618747a9a4ce336c5e0f4ebbb67e47903d9ccc5902cdee48c9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 15571, hash: 'b3d3fd68944e417b31ffa08ab5851d4d8f28f5bb29eb359721b5ebd9f8cda12e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 35471, hash: 'b8851899c27994fa5eb1e9771989c407e50c042c2529471e8a7be7803a819287', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-VKT5DYEL.css': {size: 77701, hash: 'aZAE8b54F9o', text: () => import('./assets-chunks/styles-VKT5DYEL_css.mjs').then(m => m.default)}
  },
};
