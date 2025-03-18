import express from "express";
// import morgan from "morgan";

const app = express();
// app.use(morgan('dev'));

//Routes
// Be Polite, Greet the User
app.get("/greetings/:username", (req, res) => {
  res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
});

// Rolling the Dice
app.get("/roll/:number", (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number)) {
    res.send("<h1>You must specify a number.</h1>");
    return;
  }
  res.send(`<h1>You rolled a ${number}!</h1>`);
});

// I Want THAT One!
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
    const index = parseInt(req.params.index, 10); // Convert index to an integer
    const item = collectibles[index];

    if (collectibles[req.params.index] === undefined) {
      res.send("<h1>This item is not yet in stock. Check back soon!</h1>");
      return;
    }
    res.send(`<h1>So, you want the ${item.name}? For $${item.price}, it can be yours!</h1>`);
  });

  // Filter Shoes by Query Parameters
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req, res) => {
    let filteredShoes = shoes;
    const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }
    res.json(filteredShoes);
});

// Run the server on port 3000
app.listen(3000, () => {
  console.log("Express app is running on port 3000...");
});
