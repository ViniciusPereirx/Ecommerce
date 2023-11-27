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
app.post("/stripe-checkout", async (req, res) => {
  const session = await stripeGateway.checkout.session.create({
    payment_method_type: ["card"],
    mode: "payment",
    success_url: `http://127.0.0.1:5500/public/pages/success.html`,
    cancel_url: `http://127.0.0.1:5500/public/pages/cancel.html`,
  });
});

app.listen(3000, () => {
  console.log("Servidor iniciado!");
});
