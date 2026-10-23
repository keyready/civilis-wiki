import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Civilis',
      description: 'Civilis — живые деревни Minecraft: жители работают, строят и развивают поселения.',
      locales: { root: { label: 'Русский', lang: 'ru-RU' } },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/keyready/civilis' },
      ],
      sidebar: [
        { label: 'Главная', link: '/' },
        { label: 'Начало игры', items: ['installation', 'guide/first-village', 'faq'] },
        {
          label: 'Жизнь деревни',
          items: ['about', 'mechanics/professions', 'mechanics/economy', 'mechanics/housing'],
        },
        {
          label: 'Хозяйство',
          items: ['mechanics/forestry', 'mechanics/farming', 'mechanics/livestock', 'mechanics/planning'],
        },
        { label: 'Строительство и добыча', items: ['mechanics/quarry', 'mechanics/walls'] },
        {
          label: 'Справочник',
          items: ['guide/commands', 'guide/troubleshooting', 'mechanics/visuals', 'guide/principles'],
        },
        { label: 'Развитие Civilis', items: ['roadmap', 'changelog', 'milestones'] },
      ],
    }),
  ],
});
