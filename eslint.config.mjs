// eslint.config.js
export default [
    {
        files: ["src/**/*.js", "tests/**/*.js"],
        ignores: [
            "node_modules/**",
            "dist/**"
        ],
        languageOptions: {
            sourceType: "commonjs", // Add sourceType option
            ecmaVersion: 2022,
            globals: {
                Atomics: "readonly",
                SharedArrayBuffer: "readonly"
            },
            parserOptions: {
            }
        },
        rules: {
        }
    }
];