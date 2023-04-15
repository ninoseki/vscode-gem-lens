import { extractDependency } from "@/gemfile";
import { Dependency } from "@/types";

import { AbstractProvider } from "./abstractProvider";

export class GemspecProvider extends AbstractProvider {
  public gemRegexp(): RegExp {
    return /\bgem( |"|')/;
  }

  public extractDependency(line: string): Dependency | undefined {
    return extractDependency(line);
  }
}
