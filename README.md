# EVM-Opcode-Tracer
A tool to trace the usage of specific EVM opcodes in Ethereum transactions over a specified time period.

## Setup

1. Clone this repository.
2. Install the dependencies by running `npm install`.
3. Replace `your-infura-project-id` and `your-infura-project-secret` in `src/index.js` with your actual Infura project ID and Secret.

## Usage

Run the tool with the following command:
```node src/index.js --opcode 0xff --months 8```

This will trace the usage of the opcode `0xff` (SELFDESTRUCT) over the past 8 months.

The `--opcode` argument should be the opcode you want to trace, represented as a hexadecimal string. The `--months` argument should be the number of months in the past to start tracing from.

## Credits and Resources
[Infura Trace API](https://www.infura.io/platform/trace-api?ref=infura.ghost.io)

[Infura blog: Introducing Infura Trace API](https://blog.infura.io/post/introducing-the-infura-trace-api-gain-deeper-insights-from-the-ethereum-execution-layer)

[Ethereum and EVM Traces Explained](https://levelup.gitconnected.com/ethereum-and-evm-traces-explained-784ef9bf89a6) [Archived](https://archive.is/Ru0iB)

[EVM Trace in Python](https://github.com/ApeWorX/evm-trace)

[EVM Tracing in Geth](https://geth.ethereum.org/docs/developers/evm-tracing)

[Building Archive and Audit Nodes](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09)

## TODO
- Support for other providers
- Local node support
- Output Formatting (csv, .md, PDF, sqlite etc)

## Disclaimer

This tool is a simple demonstration and might not be suitable for production use. Depending on the number of blocks and transactions, the `trace_filter` request could return a large amount of data and take a long time to complete.


