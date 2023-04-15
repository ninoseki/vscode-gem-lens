import { extractDependency } from "@/gemfileLock";
import { Dependency } from "@/types";

import { AbstractProvider } from "./abstractProvider";

export class GemfileLockProvider extends AbstractProvider {
  public gemRegexp(): RegExp {
    return /\b.+\(.+\)/;
  }

  public extractDependency(line: string): Dependency | undefined {
    return extractDependency(line);
  }
}
