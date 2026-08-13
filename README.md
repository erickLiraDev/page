# Semana da Embalagem

Frontend estático da Semana da Embalagem, evento da Falcão Bauer.

## Estrutura

- `static/index.html`: página principal
- `static/site.css`: CSS final gerado para publicação
- `static/scroll-reveal.js`: animações de entrada
- `static/logo-falcao-bauer.png`: logo oficial
- `static/favicon.png`: ícone do site

Os estilos fonte ficam organizados em `styles/`, separados por responsabilidade:

- `tokens.css`: cores, medidas semânticas e valores compartilhados
- `base.css`: reset, tipografia e estados de foco
- `motion.css`: loading e revelação de conteúdo
- `hero.css`: primeira seção e composição visual
- `program.css`: programação e cards
- `footer.css`: rodapé, contatos e redes sociais
- `responsive.css`: adaptações para telas e preferências do dispositivo

Para gerar o CSS final localmente, execute:

```powershell
node scripts/build-css.mjs
```

O projeto não possui banco de dados, API, Worker ou dependências de servidor.

## Publicação

O site é publicado na Vercel como conteúdo estático. O arquivo `vercel.json`
define a pasta `static` como diretório público.

A produção acompanha a branch `main` deste repositório. A Vercel executa o mesmo
build antes de publicar, mantendo `static/site.css` atualizado a partir dos
arquivos em `styles/`.
