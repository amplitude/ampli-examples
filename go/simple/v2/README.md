# Ampi Go SDK

An example using the Ampli Go SDK to track events.

# Usage

### Setup the project 
You will need to do the following before running the app.

Create a `.env` with your API key
  1. `cp .env.example .env`
  2. Set your Amplitude API key
```
AMPLITUDE_API_KEY=your-amplitide-api-key
```

### Run the app

You can run the app using the events from our sample tracking plan. 

```shell
go run examples/simple_example/simple_example.go
```
Also, there is another example to track events concurrently using different goroutines. It serves as a good example to detect data race. 

```shell
go run examples/data_race_example/data_race_example.go
```

# Project Structure
- README.md - you are here*
- ampli
  - ampli.go - Generated SDK, don't modify by hand. Update with `ampli pull`
- examples
  - simple_example/simple_example - An example to track all events
  - data_race_example/data_race_example.go - An example to track events concurrently to detect data race
- tests
  - ampli_test.go - Unit tests
- [go.mod](https://go.dev/doc/modules/gomod-ref) - Describes the module's properties
