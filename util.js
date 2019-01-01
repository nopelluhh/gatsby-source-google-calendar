"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
async function resolveResource(options, key) {
    const { [key]: resource, [key + 'Path']: resourcePath, [key + 'Promise']: resourcePromise } = options;
    if (resource)
        return resource;
    if (resourcePath)
        return JSON.parse(fs_1.readFileSync(resourcePath, 'utf8'));
    if (resourcePromise)
        return await resourcePromise;
}
exports.resolveResource = resolveResource;
