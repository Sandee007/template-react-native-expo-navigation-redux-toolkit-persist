#!/usr/bin/env node

const {execSync} = require('child_process')

const runCommand = (command) => {
    try {
        execSync(`${command}`, {stdio: 'inherit'})
    }catch(e){
        console.error(`Failed to execute ${command}`, e);
        return false
    }
    return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Sandee007/template-react-native-expo-navigation-redux-toolkit-persist ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log(`Cloning ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand)
if(!checkedOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand)
if(!installedDeps) process.exit(-1)

console.log("Installation Complete.");
console.log(`cd ${repoName} && npm start`);