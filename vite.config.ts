import { ConfigEnv, UserConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    base: './',
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 发布时删除 console
          // drop_console: true,
        },
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/upload': {
          target: env.VITE_PROXY_UPLOAD_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/upload/, ''),
        },
      },
    },
    plugins: [
      uni(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
        exclude: ['./node_modules/**'],
        cache: false,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
  };
};
