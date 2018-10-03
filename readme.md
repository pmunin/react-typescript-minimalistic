# What is this

This is boilerplate for react application with custom scripts (no react-scripts used), that simple and give you full control over your bundle and depedencies.

Features:

- Babel ^7.0
- Webpack ^4.20
- Typescript ^3.1.1
- CSS importing
- Cleaning `./dist` folder before building

# Motivation

`create-react-app` brings too much sh%t in your project, and does not even give you control over it. E.g. has dependency on particular version of babel or typescript or jest and you cannot update it, because there are some internal dependencies that it will break. You have to use all sorts of react-rewires to do your thing which become a nightmare.