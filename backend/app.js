const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();


mongoose.connect('mongodb+srv://mongo:3RnmqlX1L0gpfi7c@cluster0-jqp4b.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('successfully connected to mongoDB Atlas')
}).catch((error) =>{
  console.log('unable to connect to mongoDB atlas');
  console.error(error);
});

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

// SAVING RECIPES TO THE DATABASE

app.post('/api/recipes', (req, res, next) =>{
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
  });
  recipe.save().then(() =>{
    res.status(201).json({
      message: 'post was created successfully'
    })
  }).catch((error) =>{
    res.status(404).json({
      error: error
    });
  });
});

/*RETRIEVING A SPECIFIC RECIPE FROM DATABASE */

app.get('/api/recipes/:id', (req, res, next) =>{
  Recipe.findOne({
    _id: req.params.id
  }).then((recipe) =>{
    res.status(200).json(recipe);
  }).catch((error) =>{
    res.status(404).json({
      error: error
    });
  });
});

//MODIFY OR UPDATE A SPECIFIC RECIPE FROM DATABASE

app.put('/api/recipes/:id', (req, res, next) =>{
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
  });
  Recipe.update({_id: req.params.id}, recipe).then(() =>{
    res.status(200).json({
      message: 'your update was successfully done'
    });
  }).catch((error) =>{
    res.status(400).json({
      error:error
    });
  });
});


// DELETE A RECIPE ON THE LIST

app.delete('/api/recipes/:id', (req, res, next) =>{
  Recipe.deleteOne({_id: req.params.id}).then(() =>{
    res.status(200).json({
      message: 'Deleted'
    });
  }).catch((error) =>{
    res.status(400).json({
      error:error
    });
  });
});
// RETRIEVING LIST OF RECIPES FROM DATABASE


app.use('/api/recipes', (req,res,next) =>{
   Recipe.find().then((recipes) =>{
     res.status(200).json(recipes);
   }).catch((error) =>{
     res.status(404).json({
       error: error
     });
   });
});


module.exports = app;