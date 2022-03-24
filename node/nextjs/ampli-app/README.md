# Ampli Node SDK (Next.js)
An example Next.js app using the Ampli Node SDK

# Usage

### Setup the project
You will need to do the following before running the app.
1. Create a `.env.local` with your API keys
   1. `cp .env.local.example .env.local`
   2. Set your Amplitude API key
2. `yarn install`

### Run the app
You can run the app using the events from our sample tracking plan.
This will log events to your Amplitude project.
* `yarn build && yarn start`

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `pages/index.tsx` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* pages/ 
  * [index.tsx](pages/index.tsx) - Example user app using Amply SDK. A good place to start.
  * api/
    * [hello.ts](pages/api/hello.ts) - Example API router.
* lib/
  * [init-ampli.ts](lib/init-ampli.ts) - Example Ampli initialization. A good place to start.
  * ampli/
    * [index.ts](lib/ampli/index.ts) - Generated SDK, don't modify by hand. Update with `ampli pull`
  * [middleware/*](lib/middleware) - Example middlewares for Event filtering
