```ts
/**
 * Algolia search configuration.
 * Values come from public env vars so secrets are not hardcoded in source.
 * Set PUBLIC_ALGOLIA_* in .env (see .env.example).
 */
export const ALGOLIA_APP_ID =
    import.meta.env.PUBLIC_ALGOLIA_APP_ID ?? "D32WIYFTUF";

export const ALGOLIA_API_KEY =
    import.meta.env.PUBLIC_ALGOLIA_API_KEY ?? "";

export const ALGOLIA_INDEX =
    import.meta.env.PUBLIC_ALGOLIA_INDEX ?? "prod_devdocs";

export const ALGOLIA_INDEX_STYLE_GUIDE =
    import.meta.env.PUBLIC_ALGOLIA_INDEX_STYLE_GUIDE ??
    "prod_devdocs_styleguide";
