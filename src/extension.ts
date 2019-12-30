import * as vscode from "vscode";
import { GemspecProvider } from "./providers/gemspecProvider";
import { GemfileProvider } from "./providers/gemfileProvider";

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
}

export function deactivate(): void {
  return;
}
