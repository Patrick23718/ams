const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser= require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {assureurService, posteService, commentaireService} = require("./services");
const numberFormat = require('number-format.js')
const {posteController, commentaireController} = require('./controllers')


dotenv.config();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
	console.log('Connected to MongoDB');
}).catch((err) => { console.log(err) });

app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(require('./middlewares/flash'));

/**
 * Views
 */
app.get('/', async (req, res) => {
    const blog = await posteService.get3Poste();
    res.status(200).render('pages/index', { blogs: blog })
})
app.get('/faq', (req, res) => {
    res.status(200).render('pages/faq')
})
app.get('/about', (req, res) => {
    res.status(200).render('pages/about')
})
app.get('/quotes', async (req, res) => {
    const categories = await assureurService.getCategorie();
    const garanties = await assureurService.getGaranty()
    const data = {
        garanties,
        categories,
        prime: 0,
        asac: 0,
        cr: 0,
        tva: 0,
        Acc: 0,
        DTA: 0,
        all: 0,
    }

    res.status(200).render('pages/quote', data)
})
app.get('/assurance-auto', (req, res) => {
    res.status(200).render('pages/car-insurance')
})
app.get('/assurance-famille', (req, res) => {
    res.status(200).render('pages/family-insurance')
})
app.get('/assurance-maladie', (req, res) => {
    res.status(200).render('pages/health-insurance')
})
app.get('/assurance-multirisque', (req, res) => {
    res.status(200).render('pages/multirisc-insurance')
})
app.get('/assurance-rcce', (req, res) => {
    res.status(200).render('pages/rcce-insurance')
})
app.get('/assurance-rccf', (req, res) => {
    res.status(200).render('pages/rccf-insurance')
})
app.get('/assurance-voyage', (req, res) => {
    res.status(200).render('pages/travel-insurance')
})

/**
 * API Methode
 */


app.post('/poste', posteController.createPoste)
app.put('/poste/:id', posteController.updatePoste)
app.post('/poste/tags/:id', posteController.updateTags)
app.put('/poste/tags/:id', posteController.deleteTags)
app.post('/comments', commentaireController.addComment)


//TODO assureur

app.post('/assureur', async (req, res) => {
    const body = req.body;
    const data = await assureurService.createAssureur(body)
    res.send(data)
})

app.post('/quote', async (req, res) => {
    const body = req.body;
    const data = await assureurService.createQuote(body)
    res.send(data)
})

app.post('/garantie', async (req, res) => {
    const body = req.body;
    const data = await assureurService.createGaranty(body)
    res.send(data)
})

app.post('/', async (req, res) => {
    try{
        const vv = parseInt(req.body.vv) || 0
        const vn = parseInt(req.body.vn) || 0
        const arr = req.body.garanties.toString().split(',') || []
        const prime = await assureurService.getAssurancesPrimes(vv, vn, req.body.categories || "", arr);
        const categories = await assureurService.getCategorie();
        const garanties = await assureurService.getGaranty()
        const data= {
            categories,
            garanties,
            prime: numberFormat("# ###,", prime.prime),
            asac: numberFormat("# ###,", prime.asac),
            cr: numberFormat("# ###,", prime.cr),
            tva: numberFormat("# ###,", prime.tva),
            Acc: numberFormat("# ###,", prime.Acc),
            DTA: numberFormat("# ###,", prime.DTA),
            all: numberFormat("# ###,", prime.all)

        }
        res.render('pages/quote', data)
    } catch (e) {
        console.log(e)
        res.redirect('/quotes')
    }
})

app.get('/azert', async (req, res) => {
    console.log(req.query)
    const primes = await assureurService.getCheapAssurance(req.query.vv, req.query.vn, req.query.arr.split(','))
    res.send(primes)
})

app.post('/categorie', async (req, res) => {
    const cat = await assureurService.createCategory(req.body);
    res.status(201).send(cat)
})

app.get('/:id', async (req, res) => {
    const post = await posteService.getPosteById(req.params.id)
    const postes= await posteService.getAllPoste();
    const comments = await commentaireService.getCommentByPoste(req.params.id)
    const { petite_image, grande_image, title, text, tags, date } = post
    const data = {
        postes, comments, petite_image, grande_image, title, text, tags, date, postId: req.params.id
    }
    console.log(data)
    res.render('pages/new-details', data)
})
app.get('*', (req, res) => {
    res.status(404).render('pages/404');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})