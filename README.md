# Civilis Site

Официальный сайт Civilis на Astro Starlight. Русская документация, история версий, механики, roadmap.

## Локальный запуск

```powershell
npm install
npm run dev
```

## Обновление истории версий

```powershell
npm run sync:changelog -- "X:\Dev\civilis"
```

Сайт берёт содержимое `CHANGELOG.md` из локального репозитория мода и убирает из публичной копии служебные пометки о тестах и приёмке. **Исходный CHANGELOG.md в репозитории мода не изменяется.** Ограничения механик (например, что стена пока не строится) остаются видимыми.

Если история версий уже импортирована, можно отдельно обновить её редактуру:

```powershell
npm run tidy:changelog
```

## Публикация

```powershell
npm run build
npx vercel --prod
```
