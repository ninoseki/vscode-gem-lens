import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

import { Gem } from "@/types";

const api = Axios.create({
  baseURL: "https://rubygems.org",
});

setupCache(api);

export async function getGem(name: string) {
  const path = `/api/v1/gems/${name}.json`;
  try {
    const res = await api.get<Gem>(path);
    if (res.status === 200) {
      return res.data;
    }
  } catch (_) {
    return undefined;
  }

  return undefined;
}
