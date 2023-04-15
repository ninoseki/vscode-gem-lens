import * as vscode from "vscode";

import { Gem } from "@/gem";
import { Dependency, Details } from "@/types";
import { extractDependency } from "@/utils";

export class AbstractHoverProvider implements vscode.HoverProvider {
  private regexp: RegExp;
  private mapper: (s: string) => Dependency | undefined;

  constructor(regexp: RegExp, mapper: (s: string) => Dependency | undefined) {
    this.regexp = regexp;
    this.mapper = mapper;
  }

  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, this.regexp);
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

  public extractDependency(line: string): Dependency | undefined {
    return extractDependency(line, this.mapper);
  }
}
