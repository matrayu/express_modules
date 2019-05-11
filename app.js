/* npm run dev */

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!");
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request: 
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    IP: ${req.ip}
    `;
    res.send(responseText);
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if (!a) {
        return res.status(400).send('Please enter a first number');
    }

    if (!b) {
        return res.status(400).send('Please enter a second number');
    }

    const total = a + b;
    const message = `The sum of ${a} and ${b} is ${total}.`;

    res.send(message);
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, you are not welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseInt(req.query.shift);

    if (!text) {
        return res.status(400).send('Please enter some text');
    }

    if (!shift) {
        return res.status(400).send('Please enter a shift amount');
    }

    const regex = /./g;

    let coded = text.replace(regex, (c) => {
        return String.fromCharCode(c.charCodeAt(0) + shift);
    });


    res.send(coded);
});

app.get('/lotto', (req, res) => {
    const { numbers } = req.query;

    if (!numbers) {
        return res.status(400).send('Please enter some numbers');
    }

    if (numbers.length != 6) {
        return res.status(400).send('Please enter atleast 6 numbers');
    }

    const min = 1, max = 20, randomArr=[], foundArr=[];
    let message = '';
    while(randomArr.length < 6) {
        let randomNum = Math.floor(Math.random() * (+max - +min))
        if (!randomArr.includes(randomNum)) {
            randomArr.push(randomNum);
        }
    };

    numbers.map((number) => {
        if (randomArr.includes(parseInt(number))) {
            foundArr.push(number)
        }
    });

    console.log('found: ', foundArr);

    switch(foundArr.length){
        case 6:
            message = 'Wow! Unbelievable! You could have won the mega millions!';
            break;
        case 5:
            message = 'Congratulations! You won $100!';
            break;
        case 4:
            message = 'Congratulations, you win a free ticket!';
            break;
        default:
            message = 'Sorry, you lose!';
    }

    res.send(message);
});

app.get('/hello', (req, res) => {
    res
        .status(200)
        .send('Hello!!!');
});

app.get('/error', (req, res) => {
    res.status(500).send('There was an issue!');
});

app.get('/nothing', (req, res) => {
    res
        .status(204)
        .end();
});

app.get('/video', (req, res) => {
    const video = {
        title: 'Cats falling over',
        description: '15 minutes of great videos',
        length: '15.40'
    };
    res.json(video)
})

app.get('/colors', (req, res) => {
    const colors = [
        {
            name: "red",
            rgb: "FF0000"
        },
        {
            name: "blue",
            rgb: "0000FF"
        },
        {
            name: "green",
            rgb: "00FF00"
        },
    ];
    res.json(colors);
})


app.get('/grade', (req, res) => {
    // get the mark from the query
    const { mark } = req.query;
  
    // do some validation
    if(!mark) {
      // mark is required
      return res
        .status(400)
        .send("Please provide a mark");
    }
  
    const numericMark = parseFloat(mark);
    if(Number.isNaN(numericMark)) {
      // mark must be a number
      return res
        .status(400)
        .send("Mark must be a numeric value");
    }
  
    if(numericMark < 0 || numericMark > 100) {
      // mark must be in range 0 to 100
      return res
        .status(400)
        .send("Mark must be in range 0 to 100");
    }
  
    if(numericMark >= 90) {
      return res
        .send("A");
    } 
  
    if(numericMark => 80) {
      return res
        .send("B");
    }
  
    if(numericMark >= 70) {
      return res
        .send("C");
    }
  
    res
      .send("F");
  });



app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
});