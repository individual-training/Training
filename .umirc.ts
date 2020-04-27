import { defineConfig } from 'umi';

export default defineConfig({
  devtool:"cheap-module-source-map",
  nodeModulesTransform: {
    type: 'none',
  },
  alias:{

  },
  proxy: {
    '/api': {
      'target': 'http://d4510.natapp1.cc/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
    '/media': {
      'target': 'http://d4510.natapp1.cc/',
      'changeOrigin': true,
    },
  },
});
