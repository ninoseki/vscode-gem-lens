import * as vscode from "vscode";

import { getGem } from "@/gem";
import { Dependency, Gem } from "@/types";
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

    const gem = await getGem(dependency.name);

    if (gem === undefined) {
      return;
    }

    const message = this.buildMessage(gem);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(gem: Gem): string {
    return `${gem.info}\n\nLatest version: ${gem.version}\n\n${gem.homepage_uri}`;
  }

  public extractDependency(line: string): Dependency | undefined {
    return extractDependency(line, this.mapper);
  }
}
