const {Assureur, Category, Quote, Garanty} = require("../models");

const createAssureur = async (body) => {
    return Assureur.create(body)
}

const createCategory = async (body) => {
    return Category.create(body)
}

const createQuote = async (body) => {
    return Quote.create(body)
}

const createGaranty = async (body) => {
    return Garanty.create(body)
}

const getCategorie = () => {
    return Category.find()
}

const getCategoryById = (id) => {
    return Category.findById(id)
}

const getGaranty = () => {
    return Garanty.find()
}

const getGarantyById = (id) => {
    return Garanty.findById(id)
}

const searchQuote = async (category, garanty) => {
    return Quote.find({category, garanty}).populate("category garanty assureur")
}

const calculateVVVN = (value, taux) => {

}

const getAssurancesPrimes = async (vv, vn, cat, arr) => {
    const assureurs = await Assureur.find();
    const category = await Category.findById(cat)
    let all = Number.POSITIVE_INFINITY
    console.log(all)
    let n = -1
    const tauxFixe = 2500
    let primes = []

    // On parcourt la liste des assureurs de la bd
    for(let j = 0; j< assureurs.length; j++){
        const assur = assureurs[j];
        sum = 0


        // on parcour les guaranties pour trouver les taux et calculer la valeur des categories
        for(let i = 0; i < arr.length; i++){
            let price = 0
            const guaranty = await getGarantyById(arr[i])
            const data = {category: cat, garanty: guaranty._id, assureur: assur}
            const quote = await Quote.findOne(data);
            if(guaranty.type === 'vv'){
                price = vv
            } else if (guaranty.type === 'vn'){
                price = vn
            }
            sum = sum + quote.tauxP * price
        }
        sum = sum + tauxFixe + assur.DR
        // numberFormat("# ###,", sum)
        const DR = assur.DR
        const x = 2500
        sum = sum + DR + x

        const asac = 1000
        const cr = 1000
        let Acc = calculateACC(sum)
        let DTA = calculateDTA(category.code)
        let tva = (sum + Acc + asac) * 19.25 / 100
        numAll = sum + asac + cr + Acc + DTA + tva
        primes.push({prime: sum, asac, cr, tva, Acc, DTA, all: numAll})
        if(all >=  numAll){
            all = numAll
            n = j
        }


    }
    console.log(n)
    console.log(primes)
    return primes[n] // Math.max(...prime)
}

const calculateACC = (value) => {
    if(value<50000){
        return 2500
    } else if(value>=50000 && value<250000){
        return 5000
    } else if(value>=250000 && value<800000){
        return 15000
    } else if(value>=800000 && value<1500000){
        return 25000
    } else if(value>=1500000 && value<5000000){
        return 40000
    } else if(value>=5000000 && value<10000000){
        return 75000
    } else if(value>=10000000 && value<50000000){
        return 200000
    } else{
        return 500000
    }
}

const calculateDTA = (value) => {
    if(value>=0 && value<=1){
        return 10000
    } else if(value>=2 && value<=7){
        return 30000
    } else if(value>=8 && value<=13){
        return 50000
    } else if(value>=14 && value<=20){
        return 75000
    } else if(value>=21){
        return 200000
    }
}

module.exports = {
    createAssureur,
    createQuote,
    getAssurancesPrimes,
    calculateACC,
    createCategory,
    getCategorie,
    createGaranty,
    getGaranty,
    searchQuote,
    getGarantyById,
    getCategoryById,
    calculateDTA
}