import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.get("/cart.html", (req, res) => {
  res.sendFile("cart.html", { root: "public/pages" });
});

let stripeGateway = stripe(process.env.stripe_key);

app.listen(3000, () => {
  console.log("Servidor iniciado!");
});
