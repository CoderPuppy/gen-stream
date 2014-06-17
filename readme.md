# gen-stream
Pull streams with generators

## Usage
```javascript
const pull = require('pull-stream')
const genStream = require('gen-stream')
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
```

## API
`genStream.source(generator)` - Creates a source from `generator`
`genStream.through(generatorFn)` - Creates a through stream from `generatorFn`
`genStream.sink(generatorFn)` - Creates a sink from `generatorFn`