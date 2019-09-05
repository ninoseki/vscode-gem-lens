import { AbstractProvider } from "./abstractProvider";

export class GemfileProvider extends AbstractProvider {
  public gemRegexp(): RegExp {
    return /\bgem( |"|')/;
  }
}
