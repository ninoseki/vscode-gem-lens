import * as vscode from "vscode";

import { ENABLE_CODE_LENS_KEY, EXT_ID } from "@/constants";
import { getGem } from "@/gem";
import { SuggestionProvider } from "@/suggestion";
import { Dependency } from "@/types";
import { extractDependency } from "@/utils";

export class AbstractCodeLensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];

  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  private regexp: RegExp;
  private mapper: (s: string) => Dependency | undefined;

  constructor(regexp: RegExp, mapper: (s: string) => Dependency | undefined) {
    this.regexp = regexp;
    this.mapper = mapper;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public async provideCodeLenses(
    document: vscode.TextDocument,
    _token: vscode.CancellationToken
  ) {
    this.codeLenses = [];

    const enabled = vscode.workspace
      .getConfiguration(EXT_ID)
      .get(ENABLE_CODE_LENS_KEY, true);

    if (!enabled) {
      return this.codeLenses;
    }

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const matches = this.regexp.exec(line.text.trim());
      if (!matches) {
        continue;
      }

      const dependency = this.extractDependency(line.text.trim());
      if (!dependency) {
        continue;
      }

      const gem = await getGem(dependency.name);
      if (!gem) {
        continue;
      }

      const indexOf = line.text.indexOf(matches[0]);
      const position = new vscode.Position(line.lineNumber, indexOf);
      const range = document.getWordRangeAtPosition(position, this.regexp);
      if (range) {
        const codeLens = new vscode.CodeLens(range);
        const suggestionProvider = new SuggestionProvider(dependency, gem);
        codeLens.command = suggestionProvider.suggest();
        this.codeLenses.push(codeLens);
      }
    }

    return this.codeLenses;
  }

  public extractDependency(line: string): Dependency | undefined {
    return extractDependency(line, this.mapper);
  }
}
