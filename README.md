# Remote Logger Server

A lightweight WebSocket-based logging service that aggregates and displays logs from multiple remote applications in real-time with beautiful console formatting.

> **Note:** This is a development tool intended for logging and debugging purposes. For production logging, consider using established logging services with authentication and data persistence.

## Installation

### Global Installation

```bash
npm install -g remote-logger-server
# or
pnpm add -g remote-logger-server
# or
yarn global add remote-logger-server
```

## Usage

### Starting the Server

```bash
# Using default port (4455)
remote-logger-server

# Using custom port
PORT=8080 remote-logger-server
```

### Local Development

```bash
git clone https://github.com/khalidsheet/remote-logger-server.git
cd remote-logger-server
pnpm install
pnpm build
```

### Running locally:

```bash
pnpm start

# With custom port
PORT=8080 pnpm start
```

The server will start and display:

```
12:00:00 PM INFO Remote Logger service started on port 4455
```

### Sending Logs from Your Application

For frontend applications (React, Vue, Angular, etc.), please use the dedicated **client package**. The client package provides a simplified API and is optimized for browser environments.

**Install the client package:**

```bash
npm install remote-logger-client
# or
pnpm add remote-logger-client
# or
yarn add remote-logger-client
```

> **Note:** The examples below show raw WebSocket usage for backend/Node.js applications. For frontend applications, use the client package instead.

### Example Client

**Node.js Example:**

```javascript
import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:4455");

ws.on("open", () => {
  ws.send(
    JSON.stringify({
      app: "MyApp",
      message: ["User logged in:", { userId: 123 }],
      caller: "src/auth/login.js:45",
    })
  );
});
```

**Browser Example:**

```javascript
const ws = new WebSocket("ws://localhost:4455");

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      app: "Frontend",
      message: ["Button clicked:", buttonId],
      caller: "components/Button.tsx:12",
    })
  );
};
```

### Output Format

Logs are displayed with the following format:

```
[TIME] [APP_NAME] [FILE] message content
```

Example:

```
12:34:56 PM [MyApp] [login.js] User logged in: { userId: 123 }
```

## Configuration

| Environment Variable | Default | Description           |
| -------------------- | ------- | --------------------- |
| `PORT`               | `4455`  | WebSocket server port |

## Development

### Build

```bash
pnpm build
```

Builds the project using `tsdown` and outputs to the `dist/` directory in both CommonJS and ESM formats.

### Project Structure

```
remote-logger-server/
├── src/
│   └── main.ts          # Main server implementation
├── dist/                # Built files
├── package.json
├── tsconfig.json
└── tsdown.config.ts     # Build configuration
```

## Requirements

- Node.js >= 20.0.0

## Dependencies

- **ws** - WebSocket server implementation
- **chalk** - Terminal string styling

## License

MIT

## Author

Khalid M. Sheet (khalid.m.sheet@gmail.com)

## Contributing

## Contributions are welcome! Feel free to open issues or submit pull requests.

Happy Hacking!
