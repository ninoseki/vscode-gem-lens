import * as vscode from "vscode";
import { extractDependency } from "../extractDependency";
import { Gem, Details } from "../gem";
import { cache } from "../common";

export class AbstractProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, this.gemRegexp());
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

    const message = this.buildMessage(details);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(info: Details): string {
    return `${info.info}\n\nLatest version: ${info.version}\n\n${info.homepage_uri}`;
  }

  public gemRegexp(): RegExp {
    return /foo bar/;
  }
}
