# Remote Logger

A lightweight WebSocket-based logging service that aggregates and displays logs from multiple remote applications in real-time with beautiful console formatting.

## Features

- 🚀 **Real-time logging** via WebSocket connections
- 🎨 **Colored output** with timestamps for easy reading
- 📦 **Multi-app support** - track logs from multiple applications simultaneously
- 🔧 **Easy integration** - simple JSON message format
- ⚡ **Lightweight** - minimal dependencies, fast startup
- 🌐 **Configurable port** - set via environment variable

## Installation

### Global Installation

```bash
npm install -g remote-logger
# or
pnpm add -g remote-logger
# or
yarn global add remote-logger
```

### Local Development

```bash
git clone <repository-url>
cd remote-logger
pnpm install
pnpm build
```

## Usage

### Starting the Server

```bash
# Using default port (4455)
remote-logger

# Using custom port
PORT=8080 remote-logger
```

Or if running locally:

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

Connect to the WebSocket server and send JSON messages in the following format:

```javascript
{
  "app": "MyApp",           // Application name (optional, defaults to "Default")
  "message": ["Log text"],  // Array of message parts
  "caller": "path/to/file.js:123"  // Source location (optional)
}
```

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
remote-logger/
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

Contributions are welcome! Feel free to open issues or submit pull requests.

---

**Note:** This is a development tool intended for logging and debugging purposes. For production logging, consider using established logging services with authentication and data persistence.
