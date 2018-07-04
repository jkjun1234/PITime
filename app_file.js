var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/topic/new', function (req, res){
  fs.readdir('data', function (err, files){
    if(err) {
      console.log(err);
      res.status(500).send('Server Error');
      }
      res.render('new', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], function(req,res) {
  fs.readdir('data', function (err, files){
    if(err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
    var id = req.params.id;
    if(id) {
      //id 값이 있을떄 실행
      fs.readFile('data/'+id, 'utf8', function (err, data){
        if(err) {
          console.log(err);
          res.status(500).send('Server Error');
        }
        res.render('view',{topics:files, title:id, description:data});
      })
    }else {
    //id 값이 없을떄
      res.render('view', {topics:files});
    }
  })
});


app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+ title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Server Error');
  }
    res.redirect('/topic/'+title);//, + req.body.title);
  });
})

app.listen(3000, function() {
  console.log('Connected, 3000');
})

// app.get('/topic/:id', function (req, res) {
//   var id = req.params.id;
//
//   fs.readdir('data', function (err, files){
//     if(err) {
//       console.log(err);
//       res.status(500).send('Server Error');
//     }
//
//     fs.readFile('data/'+id, 'utf8', function (err, data){
//       if(err) {
//         console.log(err);
//         res.status(500).send('Server Error');
//       }
//       res.render('view',{topics:files, title:id, description:data});
//     })
//   })
// })
