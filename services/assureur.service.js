const {Assureur, TypeAssureur, ValeurPrime} = require("../models");

const createAssureur = async (body) => {
    return Assureur.create(body)
}
const createTypeAssureur = async (body) => {
    return TypeAssureur.create(body)
}
const createAssureurValue = async (body) => {
    return ValeurPrime.create(body)
}

const getCheapAssurance = async (value) => {
    const values = await ValeurPrime.findById(value, datas);
    let sum = 0
    for(let i = 0; i < datas.length; i++){
        sum = sum + datas[i]
    }
    return
    // let prime = []
    // values.forEach((elt)=>{
    //     sum = 0
    //     value.forEach((item)=>{
    //         sum = sum + elt[item]
    //     })
    //     console.log(prime)
    //     prime.push(sum)
    // })
    // return prime // Math.max(...prime)
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
    } else if(value>=500000000){
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
    createTypeAssureur,
    createAssureurValue,
    getCheapAssurance,
    calculateACC,
}