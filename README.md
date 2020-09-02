# DTES: Resisting Stigma

An internal VCH website designed to teach visitors about the DTES through: **[1] a learning module** and **[2] an interactive video tour**.

Beta URL: https://dtes.netlify.app/


## Dev Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Learning Module
`~/pages/learn.vue`

This part of the website is a quiz-like set of questions with feedback given after each answer and each section.

### Content
Learning Module content can be found in markdown files in the `~/content/learn/` folder.
```js
content
├── learn
│   ├── section-1 //Each module section has its own folder
│   │   ├── question-1.md //Each questino is a markdown file
│   │   ├── question-2.md
│   │   ├── question-3.md
│   │   ├── feedback.md // The end-of-section feedback also has it's own file
│   ├── section-2
│   ├── section-3
│   ├── section-4
```

These markdown files are then used to populate the learning module