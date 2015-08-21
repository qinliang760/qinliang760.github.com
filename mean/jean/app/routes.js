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


	//生成
	app.post('/api/todos/pre', function(req, res) {


		Todo.create({			
			done:false
			//option:req.params.options
			//text:"1"
		}, function(err, todo) {
			if (err)
				res.send(err);


			var myData = {
				option:req.body.option,
				screen:req.body.screen,
				id:req.body.id
			}
			//myData.id=req.body.id;
			//myData.dir=req.body.dir;

			var outputFilename = './public/json/m'+req.body.id+'.json';
			 
			fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
			    if(err) {
			      console.log(err);
			    } else {
			      console.log("JSON saved to " + outputFilename);
			    }
			});


		jade.renderFile('./public/generate/m.jade',myData, function(err, html){
		// 这里的options是可选的
		// 回调函数可以作为第二个参数
		//console.log(html);
		fs.writeFile("./public/generate/m"+req.body.id+".html", html);
		});	


//直接调用命令
/*process.exec('jdists public/generate/zepto.fullpage.js -o public/generate/zepto.fullpage2.js',
      function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });*/
		


			getTodos(res);
		});
		

	});


	// application -------------------------------------------------------------
	app.get('/preview', function(req, res) {
		res.sendfile('./public/preview.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	app.get('/generate/*', function(req, res) {
		//console.log(req.url);
		res.sendfile('./public'+req.url+'.html'); // load the single view file (angular will handle the page changes on the front-end)
	});	
	app.get('/model', function(req, res) {
		res.sendfile('./public/h5-model/model.html'); // load the single view file (angular will handle the page changes on the front-end)
	});	
	app.get('/fontawesome', function(req, res) {
		res.sendfile('./public/h5-model/fontawesome.html'); // load the single view file (angular will handle the page changes on the front-end)
	});		
};