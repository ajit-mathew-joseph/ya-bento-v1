const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
require('dotenv').config();
const stripe = require('stripe')('sk_test_51Iq8juFCbxaAmtxRId3Nm3GGfPF8X145O4rISCR5rF2dCjkckSVu3pYCEoSBwu7j4X57RRJHJ4rmFbQR8FZ7SsGq00QxddmGVA');

const { PORT, BACKEND_URL } = process.env;
console.log(PORT);
console.log(BACKEND_URL);

app.use(express.static('.'));
app.use(express.json());
app.use(cors());

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Running...")
    }
})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// DB CONNECTION

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to Database'));

// SCHEMAS

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    suite: String,
    street: String,
    city: String,
    country: String,
    postalCode: String,
    phoneNumber: String,
    cardNumber: String,
    cardName: String,
    cvc: String,
    expiry: String,
    subscriptionPlan: String
});

const paymentSchema = new mongoose.Schema({
    email: String,
    payments: [{
        id: String,
        date: String,
        amount: String
    }]
});

// MODELS

const User = mongoose.model("User", userSchema);
const Payment = mongoose.model("Payment", paymentSchema);

// POST REQUESTS

app.post("/signup", (req, res) => {
    let newUser = User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        suite: req.body.suite,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
        subscriptionPlan: req.body.subscriptionPlan
    })
    res.status(201).send(newUser);
    console.log("New User Created!")
});

app.post("/signup/payments", (req, res) => {
    let newPayment = Payment.create({
        email: req.body.email,
        payments: req.body.payments
    })
    res.status(201).send(newPayment);
    console.log("New User Created!")
});

// GET REQUESTS

app.get("/myAccount", (_req, res) => {
    User.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(docs);
        }
    });
})

app.get("/payments", (_req, res) => {
    Payment.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(docs);
        }
    });
})

// PUT REQUESTS

app.put("/myAccount", (req, res) => {
    const filter = { email: req.body.email }
    const update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        suite: req.body.suite,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        postalCode: req.body.postalCode,
        subscriptionPlan: req.body.subscriptionPlan
    }

    User.findOneAndUpdate(filter, update, {
        new: true
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send(result);
        }
    });
})

app.put("/addDates", (req, res) => {
    const filter = { email: req.body.email }
    Payment.findOneAndUpdate(filter, {
        $push: {
            payments: req.body.addPayments
        }
    }, { new: true }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send(result);
        }})
})


// DELETE REQUESTS

app.delete("/myAccount/:id", (req, res) => {
    console.log(req.params.id);
    const filter = { "payments.id": req.params.id }
    const update = { "$pull": { "payments": { "id": req.params.id } } }

    Payment.findOneAndUpdate(filter, update, { safe: true, multi: true, new: true }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.status(201).send(result);
        }
    });
})

// Stripe Integration

const successDOMAIN = "http://localhost:3000/success";
const failDOMAIN = "http://localhost:3000/home";

app.post("/create-checkout-session/1", async (_req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "The Regular"
                    },
                    unit_amount: 800,
                },
                quantity: 5,
            },
        ],
        mode: "payment",
        success_url: `${successDOMAIN}`,
        cancel_url: `${failDOMAIN}`,
    });

    res.json({ id: session.id })
});

app.post("/create-checkout-session/2", async (_req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "The Occasional"
                    },
                    unit_amount: 900,
                },
                quantity: 3, // set to array length if possible
            },
        ],
        mode: "payment",
        success_url: `${successDOMAIN}`,
        cancel_url: `${failDOMAIN}`,
    });

    res.json({ id: session.id })
});

app.post("/create-checkout-session/3", async (_req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "The Newcomer"
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${successDOMAIN}`,
        cancel_url: `${failDOMAIN}`,
    });

    res.json({ id: session.id })
});

// Current Solution -- Store Data Temporarily In App 

// Temporary CRUD to Local JSON Files -- This is to avoid doing a read/write to 

app.post("/temp/User", (req, res) => {
    let userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        suite: req.body.suite,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
        subscriptionPlan: req.body.subscriptionPlan
    }

    let userData = fs.readFileSync("./tempData/tempUser.json");

    let userDataJS = JSON.parse(userData);
    userDataJS.push(userInfo);

    fs.writeFile("./tempData/tempUser.json", JSON.stringify(userDataJS, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
        console.log("Temp User Added")
    })
    res.status(201).send(userData);
})

app.post("/temp/Payments", (req, res) => {
    console.log(req.body);
    let payInfo = {
        email: req.body.email,
        payments: req.body.payments
    }

    let payData = fs.readFileSync("./tempData/tempPayments.json");

    let payDataJS = JSON.parse(payData);
    payDataJS.push(payInfo);

    fs.writeFile("./tempData/tempPayments.json", JSON.stringify(payDataJS, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
        console.log("Temp Payments Added")
    })
    res.status(201).send(payData);
})

app.get("/temp/User", (_req, res) => {
    let userDetails = fs.readFileSync("./tempData/tempUser.json");
    res.status(200).send(userDetails);
})

app.get("/temp/Payments", (_req, res) => {
    let payDetails = fs.readFileSync("./tempData/tempPayments.json");
    res.status(200).send(payDetails);
})

app.delete("/deleteAll", (_req, res) => {
    let payData = fs.readFileSync("./tempData/tempPayments.json");
    let payDataJS = JSON.parse(payData);
    let userData = fs.readFileSync("./tempData/tempUser.json");
    let userDataJS = JSON.parse(userData);

    userDataJS.splice(0, 1);
    payDataJS.splice(0, 1);

    fs.writeFile("./tempData/tempUser.json", JSON.stringify(userDataJS, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
        console.log("Temp User Deleted");
    })

    fs.writeFile("./tempData/tempPayments.json", JSON.stringify(payDataJS, null, 2), function (err) {
        if (err) {
            console.log(err)
        }
        console.log("Temp Payments Deleted");
    })
})