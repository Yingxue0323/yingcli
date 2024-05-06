#!/usr/bin/env node
// console.log("Hello, I'm Ying")
const { program } = require("commander")
const shell = require("shelljs")
const download = require("git-clone")
const { spawn } = require("child_process")
// const { open } = require("open")
let open;


program.version("1.0.0")

program.command("new <name>") 
    .description("new a project")
    .action(name => {
        let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git'
        download(giturl, `./${name}`, () => {
            shell.rm('-rf', `${name}/.git`)
            shell.cd(name)
            shell.exec('npm install')
            console.log(`
                New project ${name} successfully
                cd ${name} enter the project
                yingcli run ${name} to start
                yingcli show ${name} to preview
            `)
        })
        console.log(`New ${name} successfully!`)
    })

program.command("run <name>")
    .description("run the project")
    .action(name => {
        // shell.exec('npm run dev')
        let cp = spawn('npm', ['run', 'dev'])
        cp.stdout.pipe(process.stdout)
        cp.stderr.pipe(process.stderr)
        cp.on('close',()=>{
            console.log("Run project successfully")
        })
    })

program.command("show <name>")
    .description("show the project")
    .action(async name => {
        open = await import('open');
        open('https://localhost:8080/')
        console.log('Preview the project')
    })
program.parse(process.argv)