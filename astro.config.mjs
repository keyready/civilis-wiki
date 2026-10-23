import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Civilis',
      description: 'Civilis — мод для Minecraft 26.2: автономные деревни, профессии, экономика и развитие городов.',
      locales: {
        root: { label: 'Русский', lang: 'ru-RU' },
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/keyready/civilis' },
      ],
      sidebar: [
        { label: 'Главная', link: '/' },
        {
          label: 'Знакомство',
          items: ['about', 'installation', 'guide/first-village', 'faq'],
        },
        {
          label: 'Жизнь города',
          items: [
            'mechanics/professions',
            'mechanics/economy',
            'mechanics/housing',
            'mechanics/visuals',
          ],
        },
        {
          label: 'Работа и строительство',
          items: [
            'mechanics/forestry',
            'mechanics/farming',
            'mechanics/livestock',
            'mechanics/planning',
            'mechanics/quarry',
            'mechanics/walls',
          ],
        },
        {
          label: 'Справочник',
          items: ['guide/commands', 'guide/troubleshooting', 'guide/principles'],
        },
        {
          label: 'Разработка',
          items: ['roadmap', 'milestones', 'changelog'],
        },
      ],
    }),
  ],
});
