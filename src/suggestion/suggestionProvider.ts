import * as semver from "semver";
import * as vscode from "vscode";

import { Dependency, Gem } from "@/types";

export class SuggestionProvider {
  private dependency: Dependency;
  private gem: Gem;

  constructor(dependency: Dependency, gem: Gem) {
    this.dependency = dependency;
    this.gem = gem;
  }

  public suggest(): vscode.Command {
    if (this.isLatest()) {
      return { title: "latest", command: "" };
    }
    return { title: `latest: ${this.gem.version}`, command: "" };
  }

  private isLatest(): boolean {
    if (this.dependency.requirements === this.gem.version) {
      return true;
    }

    if (!this.dependency.requirements) {
      return false;
    }

    try {
      const v1 = semver.clean(this.dependency.requirements);
      if (!v1) {
        return false;
      }

      const v2 = semver.clean(this.gem.version);
      if (!v2) {
        return false;
      }

      return semver.eq(v1, v2);
    } catch (_err) {
      return false;
    }
  }
}
