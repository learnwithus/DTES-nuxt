# DTES: Resisting Stigma

An internal VCH website designed to teach visitors about the DTES through: 
**[1] a learning module** and 
**[2] an interactive video tour**.

Beta URL: https://dtes.netlify.app/
Production URL: https://stigma.vchlearn.ca/

## Stack
The DTES website is a statically generated site that uses Nuxt.js to generate static HTML which is hosted on our server.  


## Dev Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

```

## Deploy Changes

```bash
# SSH into production server and navigate into folder
$ cd dtes.vchlearn.ca

# Pull latest changes
$ git pull

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
DTES site uses the [Vuesax 4.x](https://vuesax.com/) component library as a starting point for buttons, dropdowns, etc.  It was initally selected for it's aestetic design which meshed well with the chosen design for DTES.  However, it is still fairly early in development and incomplete in terms of components.  It was also pushed as an option out-of-the-box with Nuxt even though it was an alpha stage project.  It was likely a mistake to use Vuesax in production but luckily it didn't end up biting us.