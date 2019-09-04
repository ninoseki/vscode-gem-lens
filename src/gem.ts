import axios from "axios";

export interface Details {
  version: string;
  info: string;
}

export class Gem {
  name: string;
  requirements: string;

  constructor(name: string, requirements: string) {
    this.name = name;
    this.requirements = requirements;
  }

  async details(): Promise<Details | undefined> {
    const url = `https://rubygems.org/api/v1/gems/${this.name}.json`;
    const res = await axios.get<Details>(url);
    if (res.status === 200) {
      return res.data;
    }
    return undefined;
  }

  async lastetVersion(): Promise<string | undefined> {
    const url = `https://rubygems.org/api/v1/versions/${this.name}/latest.json`;
    const res = await axios.get(url);
    if (res.status === 200) {
      if ("version" in res.data) {
        return `${res.data.version}`;
      }
    }
    return undefined;
  }

  link(): string {
    return `https://rubygems.org/gems/${this.name}`;
  }
}
