export interface Details {
  version: string;
  info: string;
  homepage_uri: string;
}

export interface Dependency {
  name: string;
  requirements: string | undefined;
}

export type Cache = Map<string, Details>;
