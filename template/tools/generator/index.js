import fs from 'fs'
import path from 'path'

const argvs = process.argv

const type = argvs[2]
let name = argvs[3]

name = name.substr(0, 1).toUpperCase() + name.substr(1)

const options = {
	'r': {
		path: __dirname + '/../../src/routes/',
		tempPath: __dirname + '/route.temp/',
		index: __dirname + '/../../src/routes/index.js'
	},
	'c': {
		path: __dirname + '/../../src/components/',
		tempPath: __dirname + '/component.temp/',
		index: __dirname + '/../../src/components/index.js'
	}
}

const Reg = new RegExp('Templates', 'g')

const reg = new RegExp('templates', 'g')

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

function writeFile(t) {
	const fileIndexPath = options[t].index
	const isFile = fs.statSync(fileIndexPath)
	if (t === 'r') {
		const indexContents = isFile ? fs.readFileSync(fileIndexPath).toString() : ''
		const c = indexContents.split('// 页面结束')
		c.splice(1, 0, 'import ' + name + ' from \'./' + name + '\'\n// 页面结束')
		fs.writeFileSync(fileIndexPath, c.join(''))
	}
	if (t === 'c') {
		const indexContents = isFile ? fs.readFileSync(fileIndexPath).toString() : ''
		let c = indexContents.split('// 组件结束')
		c.splice(1, 0, 'import ' + name + ' from \'./' + name + '\'\n// 组件结束')
		c = c.join('')
		c = c.split('}\n')
		c.splice(1, 0, '\t' + name + ',\n}\n')
		fs.writeFileSync(fileIndexPath, c.join(''))
	}
}


generate(tDir, gPath)
writeFile(type)
