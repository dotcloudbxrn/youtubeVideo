var path = require('path'),
		app = require('express')(),
		port = process.env.PORT || 8000,
		serveStatic = require('serve-static')

app.use(serveStatic(path.join(__dirname)))

app.listen(port, () => {
	console.log('listening on port', port)
})
