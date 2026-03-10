import * as path from "path";
import {
  ExtensionContext,
  workspace,
} from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join("src", "server.ts"));

  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.stdio,
      runtime: "bun",
    },
    debug: {
      module: serverModule,
      transport: TransportKind.stdio,
      runtime: "bun",
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "lidl" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/*.lidl"),
    },
  };

  client = new LanguageClient(
    "lidlLanguageServer",
    "LIDL Language Server",
    serverOptions,
    clientOptions,
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) return undefined;
  return client.stop();
}
