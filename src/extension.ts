import * as vscode from "vscode";

import { gemfileMapper, gemfileRegexp } from "@/gemfile";
import { gemfileLockMapper, gemfileLockRegexp } from "@/gemfileLock";
import { gemspecMapper, gemspecRegexp } from "@/gemspec";
import { AbstractHoverProvider } from "@/hover";

export function activate(context: vscode.ExtensionContext): void {
  const gemspecFile: vscode.DocumentFilter = {
    language: "ruby",
    pattern: "**/*.gemspec",
    scheme: "file",
  };

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      gemspecFile,
      new AbstractHoverProvider(gemspecRegexp, gemspecMapper)
    )
  );

  const gemfileFile: vscode.DocumentFilter = {
    pattern: "**/Gemfile",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      gemfileFile,
      new AbstractHoverProvider(gemfileRegexp, gemfileMapper)
    )
  );

  const gemfileLockFile: vscode.DocumentFilter = {
    pattern: "**/Gemfile.lock",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      gemfileLockFile,
      new AbstractHoverProvider(gemfileLockRegexp, gemfileLockMapper)
    )
  );
}

export function deactivate(): void {
  return;
}
