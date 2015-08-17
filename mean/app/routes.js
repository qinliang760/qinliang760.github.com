var Todo = require('./models/todo');
var fs = require('fs');
var process = require('child_process');
var jade = require('jade');
 

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
		//console.log(33333);
		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});


		

	});
	//生成
	app.post('/api/todos/pre', function(req, res) {


		Todo.create({
			loop : req.body.loop,
			done:false
			//option:req.params.options
			//text:"1"
		}, function(err, todo) {
			if (err)
				res.send(err);


			var myData = {}
			myData.loop=req.body.loop;
			myData.dir=req.body.dir;

			var outputFilename = './public/json/m'+req.body.id+'.json';
			 
			fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
			    if(err) {
			      console.log(err);
			    } else {
			      console.log("JSON saved to " + outputFilename);
			    }
			});


		jade.renderFile('./public/generate/m.jade',{ author: "qinliang"}, function(err, html){
		// 这里的options是可选的
		// 回调函数可以作为第二个参数
		console.log(html);
		fs.writeFile("outjade.html", html);
		});	


//直接调用命令
/*process.exec('jdists public/generate/zepto.fullpage.js -o public/generate/zepto.fullpage2.js',
      function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });*/
		

			// get and return all the todos after you create another
			getTodos(res);
		});
		

	});


	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('/preview', function(req, res) {
		res.sendfile('./public/preview.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
		
};