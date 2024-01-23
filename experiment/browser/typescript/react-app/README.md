#  Experiment Codegen with Ampli (Browser TypeScript)
An example React app using the codegenerated Experiment SDK (Xpmt). Based on create-react-app.

# Usage

### Setup the project
You will need to do the following before running the app.
1. Create a `.env` with your API keys
    1. `cp .env.example .env`
    2. Set your Experiment Client Deployment key
2. `yarn install`

### Run the app
You can run the app using the events from our sample experiments.
* `yarn start`

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli exp -t <experiment-server-token> -d <experiment-deployment-name>`
3. Update `xpmt.ts` to use the latest experiments definitions from the website

# Project structure
* README.md - you are here *
* * src/
* [App.tsx](src/App.tsx) - Example user app using Xpmt SDK. A good place to start.
* [xpmt.ts](src/xpmt.ts) - Generated Experiment SDK, don't modify by hand. Update with `ampli exp`
