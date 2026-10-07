# Bloomin

Landing page da Bloomin (escola de inglês online da Jamile Oliveira). React 19 + Vite + Tailwind v4 + Lenis.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # gera ./dist
npm run preview  # serve o build em http://localhost:4173
```

## Deploy

Site 100% estático: basta publicar a pasta `dist` (build command `npm run build`, output `dist`).
`vercel.json` define o cache dos arquivos em `/assets`.

## Conteúdo

Textos, cursos, FAQ e depoimentos ficam em `src/data/content.ts`. Imagens em `public/assets`.
