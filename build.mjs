#!/usr/bin/env node
/**
 * The site in public/ is the finished redesign and is committed as-is.
 *
 * This file used to regenerate public/ from src/ in the original design, which
 * overwrote the redesign on every deploy. It now does nothing, so `npm run build`
 * (and any host build command that calls it) leaves public/ untouched.
 *
 * The original generator is kept as build.legacy.mjs.
 */
console.log("public/ is prebuilt - nothing to build.");
