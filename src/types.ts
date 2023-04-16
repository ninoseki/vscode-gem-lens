export interface Gem {
  version: string;
  info: string;
  homepage_uri: string;
}

export interface Dependency {
  name: string;
  requirements: string | undefined;
}
