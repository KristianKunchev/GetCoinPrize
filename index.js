import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 1. Create an express app and set the port number.
const app = express();
const port = 3000;


// 3. Use the public folder for static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/getCoin", async (req, res) =>{
    const { coin } = req.body;

    try {
        const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
        const price = result.data[coin]?.usd;

        if (price) {
        res.render("index.ejs", { coinName: coin, price, error: null });
        } else {
        res.render("index.ejs", { coinName: null, price: null, error: "Coin not found." });
        }

    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) })
    }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});