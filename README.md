# AMQP Message Broker

## Description

This is a simple Node.js application that uses [AMQP](https://www.amqp.org/) to send and receive messages. The code contains a simple example of a producer and a consumer. The producer sends a message to the queue through an api endpoint and the consumer receives the message from the queue and logs it to the console.

## Requirements

- [Node.js](https://nodejs.org/en/) v18.0.0 or higher
- [Yarn](https://yarnpkg.com/) v1.22.0 or higher
- [Koa](https://koajs.com/) v2.13.0 or higher
- [AMQP](https://www.amqp.org/) v0.9.1 or higher

## Environment Variables

```bash
# CloudAMQP URL
CLOUDAMQP_URL=
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn dev

# build
$ yarn build

# start
$ yarn start

# clean start
$ yarn clean:start
```

## Code Structure

```bash
.
├── README.md
├── consumer
│   ├── package.json
│   ├── src
│   │   ├── ampq-consumer.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── yarn.lock
└── publisher
    ├── package.json
    ├── src
    │   ├── ampq-publisher.ts
    │   ├── index.ts
    │   └── messenger.ts
    ├── tsconfig.json
    └── yarn.lock
```

## License

[MIT licensed](LICENSE)
