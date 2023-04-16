import * as vscode from "vscode";

import { AbstractCodeLensProvider } from "@/codelens";
import { ENABLE_CODE_LENS_KEY, EXT_ID } from "@/constants";
import { gemfileMapper, gemfileRegexp } from "@/gemfile";
import { gemfileLockMapper, gemfileLockRegexp } from "@/gemfileLock";
import { gemspecMapper, gemspecRegexp } from "@/gemspec";
import { AbstractHoverProvider } from "@/hover";

export function activate(context: vscode.ExtensionContext): void {
  vscode.commands.registerCommand(`${EXT_ID}.enableCodeLens`, () => {
    void vscode.workspace
      .getConfiguration(EXT_ID)
      .update(ENABLE_CODE_LENS_KEY, true, true);
  });

  vscode.commands.registerCommand(`${EXT_ID}.disableCodeLens`, () => {
    void vscode.workspace
      .getConfiguration(EXT_ID)
      .update(ENABLE_CODE_LENS_KEY, false, true);
  });

  // for Gemspec
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

  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      gemspecFile,
      new AbstractCodeLensProvider(gemspecRegexp, gemspecMapper)
    )
  );

  // for Gemfile
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
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      gemfileFile,
      new AbstractCodeLensProvider(gemfileRegexp, gemfileMapper)
    )
  );

  // for Gemfile.lock
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
