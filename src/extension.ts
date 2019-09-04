import * as vscode from "vscode";
import { extractDependency } from "./extractDependency";
import { Gem, Details } from "./gem";
import { getMaxListeners } from "cluster";

const gemRegexp = /\w+\.(add_development_dependency|add_runtime_dependency|add_dependency)/;

let cache: Map<string, Details> = new Map();

function buildMessage(info: Details): string {
  return `${info.info}\n\nLatest version: ${info.version}`;
}

class GemspecProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, gemRegexp);
    const line = document.lineAt(position.line).text.trim();

    const dependency = extractDependency(line);
    if (!dependency) {
      return;
    }

    const gem = new Gem(dependency.name, dependency.requirements);
    if (!cache.has(gem.name)) {
      const details = await gem.details();
      if (details !== undefined) {
        cache.set(gem.name, details);
      }
    }
    const details = cache.get(gem.name);
    if (details === undefined) {
      return;
    }

    const message = buildMessage(details);
    const link = new vscode.Hover(message, range);
    return link;
  }
}

export function activate(context: vscode.ExtensionContext): void {
  const gemspecFile: vscode.DocumentFilter = {
    language: "ruby",
    pattern: "**/*.gemspec",
    scheme: "file",
  };

  const disposable = vscode.languages.registerHoverProvider(
    gemspecFile,
    new GemspecProvider()
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
