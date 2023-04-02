const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser= require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Poste = require("./models/Poste");
const Personel = require("./models/Personel");
const Reseau = require("./models/Reseau");
const {Assureur, TypeAssureur, ValeurPrime} = require("./models");
const {assureurService} = require("./services");

dotenv.config();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
mongoose.connect('mongodb://localhost:27017/ams', { useNewUrlParser: true }).then(() => {
	console.log('Connected to MongoDB');
}).catch((err) => { console.log(err) });

app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(require('./middlewares/flash'));

/**
 * Views
 */
app.get('/', (req, res) => {
    res.status(200).render('pages/index')
})
app.get('/news-details', (req, res) => {
    res.render('pages/new-details')
})
app.get('/faq', (req, res) => {
    res.status(200).render('pages/faq')
})
app.get('/about', (req, res) => {
    res.status(200).render('pages/about')
})
app.get('/quotes', (req, res) => {
    res.status(200).render('pages/quote')
})

/**
 * API Methode
 */

//TODO assureur

app.post('/assureur', async (req, res) => {
    const body = req.body;
    const data = await assureurService.createAssureur(body)
    res.send(data)
})
app.post('/assureur/:assureur', async (req, res) => {
    const body = { assureur: req.params.assureur, ...req.body }
    const data = await assureurService.createTypeAssureur(body)
    res.send(data)
})
app.post('/assureur/:assureur/:assureurType', async (req, res) => {
    const body = { assureur: req.params.assureur, typeAssureur: req.params.assureurType, ...req.body }
    const data = await ValeurPrime.create(body)
    res.send(data)
})

// app.get('/:id', (req, res) => {

// })

app.post('/', (req, res) => {

})

app.post('/person', async (req, res) => {
    
    const person = await Personel.create({...req.body});
    res.status(201).send(person)
})

app.get('/person', async (req, res) => {
    const person = await Personel.find().populate("poste");
    // const data =  person.map(async (resp)=> {
    //     const reseau = await Reseau.find({user: resp._id})
    //     console.log({...resp, reseaux: reseau});
    //     return {...resp, reseaux: reseau}
    // })
    Promise.all(person.map(async (resp)=> {
        const reseau = await Reseau.find({user: resp._id})
        console.log({...resp, reseaux: reseau});
        return {...resp, reseaux: reseau}
    })).then(data=>{
        res.status(200).send(data)

    })
})

app.get('/azert', (req, res) => {
    const val = assureurService.getCheapAssurance(req.body.value)
    res.send(val)
})

app.post('/:person/reseau', async (req, res) => {
    try {
        const resau = await Reseau.findOne({user: req.params.person, type: req.body.type})
        if(resau) throw new Error("Existe deja");
        const data = {user: req.params.person, ...req.body}
    const person = await Reseau.create(data);
    res.status(201).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
    
})

app.post('/poste', async (req, res) => {
    const { libelle } = req.body;
    const poste = await Poste.create({libelle});
    res.status(201).send(poste)
})

app.get('/poste', async (req, res) => {
    const poste = await Poste.find();
    res.status(200).send(poste)
})

app.get('*', (req, res) => {
    res.status(404).render('pages/404');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})