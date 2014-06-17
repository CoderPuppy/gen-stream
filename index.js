const cooperator = require('cooperator')
const pull       = require('pull-stream')

exports.source = function(gen) {
	if(typeof(gen.pullStream) == 'function') {
		if(!gen.started) {
			gen.start()
		}
		return gen.pullStream
	} else {
		return cooperator(gen).start().pullStream
	}
}

exports.through = pull.Through(function(read, genFn) {
	function genRead() {
		return function(cb) {
			process.nextTick(function() {
				if(genRead.running)
					read(null, function(end, data) {
						if(end) {
							genRead.running = false
							if(end === true)
								cb()
							else
								cb(end)
						} else {
							cb(null, data)
						}
					})
				else
					cb()
			})
		}
	}
	genRead.running = true
	const gen = cooperator(genFn(genRead)).start()
	return gen.pullStream
})

exports.sink = pull.Sink(function(read, genFn) {
	function genRead() {
		return function(cb) {
			process.nextTick(function() {
				if(genRead.running)
					read(null, function(end, data) {
						if(end) {
							genRead.running = false
							if(end === true)
								cb()
							else
								cb(end)
						} else {
							cb(null, data)
						}
					})
				else
					cb()
			})
		}
	}
	genRead.running = true
	cooperator(genFn(genRead)).start()
})