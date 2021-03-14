import { setup } from "axios-cache-adapter";

import { Details } from "./types";

const api = setup({
  baseURL: "https://rubygems.org",
});

export class Gem {
  name: string;
  requirements: string | undefined;

  constructor(name: string, requirements: string | undefined) {
    this.name = name;
    this.requirements = requirements;
  }

  async details(): Promise<Details | undefined> {
    const path = `/api/v1/gems/${this.name}.json`;
    const res = await api.get<Details>(path);
    if (res.status === 200) {
      return res.data;
    }
    return undefined;
  }
}
