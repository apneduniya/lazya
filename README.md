<h1 align="center">lazyA 😴</h1>
<p align="center">An agent which help you to execute actions on apps like <b>Youtube</b>, <b>Gmail</b>, <b>GitHub</b>, etc via natural language. Sounds crazy right, perfect for lazy people like me 🤭</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#-demo">Demo</a></li>
    <li><a href="#-features">Features</a></li>
    <li><a href="#-how-i-used-gaianet">How I Used GaiaNet?</a></li>
    <li>
      <span>Getting Started</span>
      <ul>
        <li><a href="#-prerequisites">Prerequisites</a></li>
        <li><a href="#-steps-to-run">Steps to Run</a></li>
      </ul>
    </li>
    <li><a href="#%EF%B8%8F-project-structure">Project Structure</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-acknowledgments">Acknowledgments<a/></li>
  </ol>
</details>

## 🎥 DEMO
[![demo video](https://cdn.loom.com/sessions/thumbnails/f7cded69452940febdef5de0c7bb038b-c7bbe3ea58995819-full-play.gif)](https://www.loom.com/embed/f7cded69452940febdef5de0c7bb038b?sid=7c87706d-3c28-4c9b-96a8-40fdcdb1d29b)

## 📙 Features
Currently we support **Github, Gmail, Youtube, Google Docs** and **Google Calendar**. If you give good prompts it can interact with that app as you wish, like:

- Subscribing to any youtube channel.
- Writing docs.
- Searching videos on youtube.
- Schedule events on google calendar and even you can send to attendees email.
- And much much more!!

## 🤔 How I used GaiaNet?
**Gaianet** was very _crucial and neccessary_ for making my project. It is the **heart and brain** of this project. It helped to make AI agents which can decide _what action is needed to use, what data I need to pass and even giving back friendly response for the user_. In this project I used LLM from **Public GaiaNet nodes**, and it helped me to give a _style, expertise and vibe_ to this project 😎. It would really be very hard to make this project, if I hadn't used Gaianet 🔥.

## 🫳 Prerequisites
You should have

- Node v20.16.0 or higher
- COMPOSIO API KEY

## 👣 Steps to Run
**Navigate to the Project Directory:**
Change to the directory where the project files are located. For example:
```shell
cd path/to/project/directory
```

### 1. Run the Setup File
Make the setup.sh Script Executable (if necessary):
On Linux or macOS, you might need to make the setup.sh script executable:
```shell
chmod +x setup.sh
```
Execute the setup.sh script to set up the environment, install dependencies, login to composio platform and 
get the API:
```shell
./setup.sh
```
Now, Fill in the `.env.local` file with your secrets.

### 2. Run the development server
```shell
bun run dev
```

## 🏛️ Project structure

```bash
.
├── bun.lockb
├── components.json
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── setup.sh
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── check-connect-app
│   │   │   │   └── [...slug]
│   │   │   │       └── route.js
│   │   │   ├── connect-app
│   │   │   │   └── [...slug]
│   │   │   │       └── route.js
│   │   │   └── run-agent
│   │   │       └── route.js
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components
│   │   ├── blocks
│   │   │   ├── expandable-card-demo-grid.jsx
│   │   │   └── expandable-card-demo-standard.jsx
│   │   ├── common
│   │   │   ├── DotBackground.jsx
│   │   │   ├── InputWithButton.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── PromptSuggestionButtton.jsx
│   │   ├── section
│   │   │   └── SupportedApps.jsx
│   │   ├── theme-provider.jsx
│   │   └── ui
│   │       ├── alert.jsx
│   │       ├── animated-modal.jsx
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── dialog.jsx
│   │       ├── flip-words.jsx
│   │       ├── input.jsx
│   │       ├── select.jsx
│   │       ├── toaster.jsx
│   │       └── toast.jsx
│   ├── helpers
│   │   └── common.js
│   ├── hooks
│   │   ├── use-outside-click.js
│   │   └── use-toast.js
│   ├── lib
│   │   └── utils.js
│   └── utils
│       ├── agent.js
│       ├── common.js
│       ├── index.js
│       └── llm.js
└── tailwind.config.js
```

## 🤗 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## ✍ Acknowledgments
This project couldn't be there if they didn't be there!
- [GaiaNet](https://www.gaianet.ai/)
- [Composio](https://composio.dev/)

Even something was gone wrong while making this project but gaianet team helped me to over come the issues and I am really thankful to it!
