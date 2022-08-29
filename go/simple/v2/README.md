# Ampi Go SDK (Alpha)

An example uisng the Ampli Go SDK (Alpha) to track events.

# Usage

### Setup the project 
You will need to do the following before running the app.

`go get .`

`cp .env.example .env`

Change keys in `.env`

### Run the app

You can run the app using the events from our sample tracking plan. 

```go
go run examples/simple_example/simple_example.go
```
Also, there is another example to track events concurrently using different goroutines. It serves as an good example to detect data race. 

```go
go run examples/data_race_example/data_race_example.go
```

# Project Structure
- README.md - you are here*
- ampli
  - ampli.go - Generated SDK, don't modify by hand. Update with `ampli pull`
  - ampli_test.go - Unit tests 
- examples
  - simple_example/simple_example - An example to track all events
  - data_race_example/data_race_example.go - An example to track events concurrently to detect data race
- [go.mod](https:go.dev/doc/modules/gomod-ref) - Describes the module's properties
