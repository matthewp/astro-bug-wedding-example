// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), {
    name: 'my-integration',
    hooks: {
      'astro:build:start': ({ logger }) => {
        logger.info("Building");
      }
    }
  }],
  adapter: netlify()
});
