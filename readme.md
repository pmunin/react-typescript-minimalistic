# What is this

This is boilerplate for react application with custom minimalistic scripts (no react-scripts used), which is very simple and give you full control over your bundle and depedencies.

Features:

- Babel ^7.1
- Webpack ^5.27
- Typescript ^4.2.3
- CSS importing
- Cleaning `./dist` folder before building
- You can mix JS(X) modules and TS(X) modules
- Code splitting (node modules are bundled into separate js file from your code)

## Motivation

`create-react-app` brings too much sh%t in your project, incapsulating all the important details, making you lose control over it. E.g. has dependency on particular version of babel or typescript or jest and you cannot update it, because there are some internal dependencies that it will break. You have to use all sorts of react-rewires to do things the way you want which become a nightmare.
