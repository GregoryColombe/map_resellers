module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: [
        "@nuxtjs",
        "plugin:nuxt/recommended"
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        indent: ["warn", 4],
        quotes: ["warn", "double"],
        "no-console": "off",
        "space-before-function-paren": ["warn", "never"]
    }
}
