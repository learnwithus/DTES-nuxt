# DTES: Resisting Stigma

An internal VCH website designed to teach visitors about the DTES through: 
**[1] a learning module** and 
**[2] an interactive video tour**.

Beta URL: https://dtes.netlify.app/
Production URL: https://stigma.vchlearn.ca/

## Stack
The DTES website is a statically generated site that uses Nuxt.js to generate static HTML which is hosted on our server.  


## Dev Setup

Use Node 22.22.3+, Node 24.15.0+, or Node 26+ as specified in the package engines.

```bash
# install dependencies
$ npm ci

# serve with hot reload at localhost:3000
$ npm run dev

```

## Deploy Changes

```bash
# SSH into production server and navigate into folder
$ cd dtes.vchlearn.ca

# Pull latest changes
$ git pull

# generate static project to .output/public
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
│   ├── section-1 // Each module section has its own folder
│   │   ├── question-1.md //Each question is a markdown file
│   │   ├── question-2.md
│   │   ├── question-3.md
│   │   ├── feedback-1.md // The end-of-section feedback also has it's own file
│   │   ├── feedback-2.md
│   ├── section-2
│   ├── section-3
│   ├── section-4
```

These markdown files are then used to populate the learning module.  This is done on the learn.vue page component as the helper function `~/helpers/formatLearnQuestions.js` is used to do this.

**Note:** Some feedback sections are simply links to vue componenets with interacticity too complex for markdown.  In these cases you can find the vue components referenced in the markdown, in the global component folder: `~/components/global/learn-feedback/`

## Interactive Tour
`~/pages/tour/`

This part of the website is an interactive tour where visitors click around a map to watch various interviews with peers and individuals representing origaniziatons that assist members of the DTES

### Content
Tour content can be found in markdown files in the `~/content/learn/` folder.
```js
content
├── tour
│   ├── region (dtes or coastal) // We have separted each region into their own folder
│   │   ├── videos // Folder containing the videos (locations with videos)
│   │   │   ├── person.md // Each location on the map / Video is a markdown file
│   │   │   ├── anotion-person.md
│   │   │   ├── a-place.md
│   │   │   ├── another-place.md // The end-of-section feedback also has it's own file
│   │   ├── land-aknowldegement.md // The land aknowledgement for that region
│   ├── intro.md // Content displayed at the beginning of the tour
│   ├── conclusion.md // Content dispaleyd when the user is finished the tour
```

## Other Pages

There are also other pages such as:
- About
- Resources

The content for these can also be found in markdown files in `~/content/`

## Layout
Layout is done using Bulma's column system
https://bulma.io/documentation/columns

## UI
The course uses Bulma for layout, local Vue components for buttons and quiz controls, and Floating Vue for tooltips. Desktop matching supports drag and drop. Mobile matching uses the browser’s select control.
