import { AbstractProvider } from "./abstractProvider";

export class GemspecProvider extends AbstractProvider {
  public gemRegexp(): RegExp {
    return /\w+\.(add_development_dependency|add_runtime_dependency|add_dependency)/;
  }
}
