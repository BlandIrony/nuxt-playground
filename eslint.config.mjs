import antfu from "@antfu/eslint-config";

// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
    antfu(
        {
            type: "app",
            vue: true,
            typescript: true,
            formatters: true,
            stylistic: {
                indent: 4,
                semi: true,
                quotes: "double",
            },
        },
        {
            rules: {
                "ts/no-redeclare": "off",
                "vue/max-attributes-per-line": [
                    "error",
                    {
                        singleline: { max: 3 },
                        multiline: { max: 1 },
                    },
                ],
                "ts/consistent-type-definitions": ["error", "type"],
                "no-console": ["warn"],
                "antfu/no-top-level-await": ["off"],
                "node/prefer-global/process": ["off"],
                "node/no-process-env": ["error"],
                "perfectionist/sort-imports": [
                    "error",
                    {
                        type: "natural",
                        groups: [
                            "builtin",
                            "external",
                            "internal",
                            ["parent", "sibling", "index"],
                        ],
                        newlinesBetween: 1,
                    },
                ],
                "unicorn/filename-case": "off",
            },
        },
    ),
    {
        ignores: [
            "**/*.css",
            "**/*.md",
            "**/*.yaml",
            "**/*.yml",
            "**/.github/**",
            "**/.vscode/**",
        ],
    },
);
