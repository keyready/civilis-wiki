import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Civilis',
      description: 'Civilis — Minecraft-мод об автономном развитии деревень и городов.',
      locales: {
        root: { label: 'Русский', lang: 'ru-RU' },
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/keyready/civilis' }],
      sidebar: [
        { label: 'Главная', link: '/' },
        {
          label: 'Начало работы',
          items: ['about', 'installation'],
        },
        {
          label: 'Механики Civilis',
          items: [{ autogenerate: { directory: 'mechanics' } }],
        },
        {
          label: 'Разработка',
          items: ['roadmap', 'changelog'],
        },
      ],
    }),
  ],
});
