var express = require('express');
var router = express.Router();

function Note(pType, pName, pQty,pPrice) {
  this.type= pType;
  this.name = pName;
  this.qty = pQty;
this.price = pPrice;
}

ServerNotes = [];

ServerNotes.push(new Note("Food", "Pizza", 1,9));
ServerNotes.push(new Note("Clothes", "Coat", 1,50));
ServerNotes.push(new Note("Meat", "Chicken", 2,5));



/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile('index.html')
});

/* GET all Notes data */
router.get('/getAllNotes', function(req, res) {
  res.status(200).json(ServerNotes);
});


router.post('/AddNote', function(req, res,next) {
  const newNote = req.body;
  ServerNotes.push(newNote);
  res.status(200);
})

router.delete('/DeleteNote/:name', (req, res,next) => {
  const name = req.params.name;
  let found = false;
  console.log(name);    

  for(var i = 0; i < ServerNotes.length; i++) // find the match
  {
      if(ServerNotes[i].name === name){
        ServerNotes.splice(i,1);  // remove object from array
          found = true;
          break;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Note ' + name + ' deleted!');
  }
});

router.post('/Change/:Change', function(req, res,next) {
  const qty = req.params.qty;
  let found = false;
  for(var i = 0; i < ServerNotes.length; i++) 
  {
      if(ServerNotes[i].qty === qty){
       ServerNotes.push( new Note(ServerNotes[i].type, ServerNotes[i].name, ServerNotes[i].qty,ServerNotes[i].price));
        ServerNotes.splice(i,2);  // remove object from array
          found = true;
      }
  }
  if(!found) {
    res.send = "Sorry, could not find";
  }


})



module.exports = router;
