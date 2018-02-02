import fs from 'fs'
import path from 'path'

const argvs = process.argv

const type = argvs[2]
let name = argvs[3]

name = name.substr(0, 1).toUpperCase() + name.substr(1)

const options = {
	'r': {
		path: __dirname + '/../../src/routes/',
		tempPath: __dirname + '/route.temp/'
	},
	'c': {
		path: __dirname + '/../../src/components/',
		tempPath: __dirname + '/component.temp/'
	}
}

const Reg = new RegExp('Templates')
Reg.global = true

const reg = new RegExp('templates')
reg.global = true

if (!options[type]) throw new Error('type is none')

let tDir = options[type].tempPath
let gPath = options[type].path + name + '/'

function generate(tempDir, genPath) {
	mkdir(genPath)
	let files = fs.readdirSync(tempDir)
	files.forEach((file) => {
		let stat = fs.statSync(tempDir + file)
		if (stat.isFile()) {
			let content = fs.readFileSync(tempDir + file).toString()
			content = content.replace(Reg, name).replace(reg, name.toLowerCase())
			let suffix = file.substr(file.indexOf('.'), file.length)
			let filename
			if (Reg.test(file))
				filename = name + suffix
			else if (reg.test(file))
				filename = name.toLowerCase() + suffix
			else
				filename = file
			mkfile(genPath + filename, content)
		} else if (stat.isDirectory()) {
			let dir = genPath + file + '/'
			mkdir(dir)
			generate(tempDir + file + '/', dir)
		}
	})
}

function mkdir(dir) {
	dir = path.normalize(dir)
	console.info('make folder, path:' + dir)
	fs.existsSync(dir) || fs.mkdirSync(dir)
}

function mkfile(dir, content) {
	dir = path.normalize(dir)
	console.info('make folder, path:' + dir)
	fs.writeFileSync(dir, content)
}

generate(tDir, gPath)
