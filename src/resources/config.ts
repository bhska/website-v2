const baseURL = 'bhsk.dev';

const routes: RoutesConfig = {
  '/': true,
  '/about': true,
  '/work': true,
  '/blog': true,
  '/contact': true,
  // '/stack': true,
  '/experience': true,
};

export interface RoutesConfig {
  [key: string]: boolean;
  '/': boolean;
  '/about': boolean;
  '/work': boolean;
  '/blog': boolean;
  '/contact': boolean;
  '/experience': boolean;
  // '/stack': boolean;
}

export { routes, baseURL };
