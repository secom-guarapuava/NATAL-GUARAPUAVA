# Natal em Guarapuava 2026 — site

Site de página única com a programação do Natal da Prefeitura de Guarapuava.
HTML, CSS e JavaScript puros: não precisa instalar nada nem rodar build.

## Como atualizar a programação

Tudo o que muda no site está em **um arquivo só: `programacao.js`**.

- **Eventos**: cada item da lista `eventos` tem título, data, horário, lugar, tipo e descrição.
  - Um dia: `data: "2026-12-05"`
  - Vários dias: `datas: ["2026-12-18", "2026-12-19"]`
  - Horários em 24h: `inicio: "19:30"`, `fim: "21:00"` (o `fim` é opcional)
  - `local` precisa ser o `id` de um lugar da lista `locais`
  - `categoria` precisa ser o `id` de um tipo da lista `categorias`
- **Lugares** (`locais`): cada um vira um postal na seção "Onde a magia acontece".
  `postal` é a imagem da frente e `recado` é a frase escrita à mão no verso.
- **Aviso de programação provisória**: quando a agenda oficial estiver fechada,
  troque `programacaoProvisoria: true` por `false`.
- **Apoiadores**: preencha `apoiadores` para mostrar logos no rodapé (só no site; nas redes institucionais, não).
- **Redes oficiais**: preencha `redes` para aparecerem como links no rodapé.

As datas, o período no topo, os filtros, a contagem regressiva e os botões
"Salvar na agenda" e "Enviar no WhatsApp" são gerados sozinhos a partir desse arquivo.

> Atenção: a programação que está no arquivo agora é **de exemplo**.
> Confira também qual postal ficou em cada lugar (campo `postal` de cada item em `locais`).

## Como publicar no GitHub Pages

1. Crie um repositório (por exemplo `natal-guarapuava`) e envie **todo o conteúdo desta pasta** para a raiz dele.
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, pasta `/ (root)`. Salve.
3. Em um ou dois minutos o site fica no ar em `https://SEU-USUARIO.github.io/natal-guarapuava/`.
4. Para atualizar a programação depois, basta editar `programacao.js` direto no GitHub e salvar (commit).

O arquivo `.nojekyll` já está na pasta para o GitHub servir tudo como está.

## Estrutura

```
index.html              página
programacao.js          conteúdo (edite aqui)
assets/css/estilo.css   visual
assets/js/site.js       monta programação, filtros, postais e rodapé
assets/js/magia.js      animações (céu, árvore, varinha, cordão, neve…)
assets/img/             imagens da identidade em WebP + og.jpg (prévia de compartilhamento)
```

## Animações

- Árvore do topo acende de baixo para cima e a estrela brilha no fim; tocar no postal repete o brilho.
- Céu com estrelas piscando, pó de estrela subindo e estrela cadente.
- Rastro de brilho no cursor (no celular, ao tocar e arrastar).
- Cordão de luzes que acende quando a programação aparece.
- Postais chegam voando e viram ao toque; o selo carimba a carta da cidade.
- Botão "Fazer nevar" no canto da tela.

Quem ativou "reduzir movimento" no celular ou no computador vê a página
já acesa e sem animações, e o botão de neve não aparece.
