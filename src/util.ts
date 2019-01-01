import { readFileSync } from "fs";

export async function resolveResource(options: any, key: string) {
  const {
    [key]: resource,
    [key+'Path']: resourcePath,
    [key+'Promise']: resourcePromise
  } = options;
  if (resource) return resource
  if (resourcePath) return JSON.parse(readFileSync(resourcePath, 'utf8'))
  if (resourcePromise) return await resourcePromise
}
