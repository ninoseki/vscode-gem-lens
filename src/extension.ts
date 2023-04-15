import * as vscode from "vscode";

import {
  GemfileProvider,
  GemfileLockProvider,
  GemspecProvider,
} from "@/providers";

export function activate(context: vscode.ExtensionContext): void {
  const gemspecFile: vscode.DocumentFilter = {
    language: "ruby",
    pattern: "**/*.gemspec",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(gemspecFile, new GemspecProvider())
  );

  const gemfileFile: vscode.DocumentFilter = {
    pattern: "**/Gemfile",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(gemfileFile, new GemfileProvider())
  );

  const gemfileLockFile: vscode.DocumentFilter = {
    pattern: "**/Gemfile.lock",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      gemfileLockFile,
      new GemfileLockProvider()
    )
  );
}

export function deactivate(): void {
  return;
}
