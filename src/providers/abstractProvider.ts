import * as vscode from "vscode";

import { Gem } from "@/gem";
import { Dependency, Details } from "@/types";

export class AbstractProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, this.gemRegexp());
    const line = document.lineAt(position.line).text.trim();

    const dependency = this.extractDependency(line);
    if (!dependency) {
      return;
    }

    const gem = new Gem(dependency.name, dependency.requirements);
    const details = await gem.details();

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

  public extractDependency(_: string): Dependency | undefined {
    return undefined;
  }
}
