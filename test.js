const pull = require('pull-stream')
const genStream = require('./')
pull(
	genStream.source(function*() {
		yield 1
		yield 2
		yield 3
	}),
	genStream.through(function*(read) {
		while(true) {
			var input = yield read()
			if(!input) break
			yield input + input / 10
		}
	}),
	genStream.sink(function*(read) {
		while(true) {
			var input = yield read()
			if(!input) break
			console.log(input)
		}
	})
)

// =>
//  1.1
//  2.2
//  3.3