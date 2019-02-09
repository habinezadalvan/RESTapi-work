const express = require('express');


const app = express();



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use('/api/recipes', (req,res,next) =>{
    const recipes = [
        {
            title: 'recipe 1',
            ingredients: 'tomato, beef meat,oil',
            instructions: 'prepare all the ingredients and get soucepans and gas and cook',
            difficulty: 'it takes time more that 40 minutes',
            time: 50,
            _id: 'jjsdjsj',
          },
          {
            title: 'recipe 2',
            ingredients: 'irish potato,oil',
            instructions: 'prepare all the ingredients and get soucepans and gas and cook',
            difficulty: 'it takes time more than 20 minutes',
            time: 24,
            _id: 'ysefa',
          },
          {
            title: 'recipe 1',
            ingredients: 'tomato, rice,oil, salt',
            instructions: 'prepare all the ingredients and get soucepans and gas and cook',
            difficulty: 'it takes time more than 25 minutes',
            time: 30,
            _id: 'djskd',
          },
          
          
    ];
    res.status(200).json(recipes);
});


module.exports = app;