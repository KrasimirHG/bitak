module.exports = {
  "parser": "babel-eslint",
  "extends": [
    'eslint-config-airbnb-base',
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "jest": true,
    "node": true
  },
  "ignorePatterns": [
    "*.d.ts",
    "tap-snapshots",
    "dist"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": [
    "require-path-exists",
    "promise"
  ],
  "rules": {
    "no-console": 1,
    "no-alert": 1,
    "no-debugger": 1,
    "promise/catch-or-return": 1,
    "promise/always-return": 1,
    "no-process-env": "error",
    "no-process-exit": "error",
    "lines-between-class-members": "warn",
    "no-case-declarations": "warn",
    "prefer-const": "warn",
    "object-curly-newline": "warn",
    "quote-props": "warn",
    "no-var": "warn",
    "no-restricted-modules": ["error", {
      "paths": [
        "express",
        "underscore",
        "stream",
        "wire",
        "nconf",
        "superagent",
        "errno",
        "marko",
        "moment",
        "ut-front/react",
        "lodash",
        "ut-codec",
        "ut-identity",
        "ut-permission"
      ]
    }],
    "template-curly-spacing" : "off",
    "indent": ["error", 4, {"SwitchCase": 1, "ignoredNodes": [ "JSXAttribute", "JSXSpreadAttribute", "TemplateLiteral"]}],
    "semi": ["error", "always"],
    "object-curly-spacing": "off",
    "space-before-function-paren": ["error", "never"],
    "multiline-ternary": "off",
    "array-callback-return": "off",
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": [1, 4],
    "react/jsx-key": 1,
    "react/jsx-handler-names": 1,
    "react/no-deprecated": 1,
    "react/no-string-refs": 1,
    "react/no-unescaped-entities": 1,
    "react/jsx-closing-bracket-location": [2, "line-aligned"],
    "react/jsx-closing-tag-location": 0,
    "require-path-exists/notEmpty": 2,
    "require-path-exists/tooManyArguments": 2,
    "require-path-exists/exists": 0,
    "no-restricted-properties": ["error", {
      "object": "when",
      "property": "defer"
    }],
    "react/no-unused-prop-types": 1
  },
  "overrides": [{
    "files": ["*.tsx", "*.ts"],
    "rules": {
      "react/prop-types": "off"
    }
  }],
  "globals": {
    "isc": true
  }
};
