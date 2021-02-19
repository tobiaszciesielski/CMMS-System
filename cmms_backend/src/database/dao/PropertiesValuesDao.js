const db = require("../db")

const {Properties, Values, PropertiesValues} = db.models

const findAllProperties = async () => {
  return await Producers.findAll()
}

const findAllValues = async () => {
  return await Values.findAll()
}

const findAllPropertiesValues = async () => {
  return await PropertiesValues.findAll()
}

const createPropertiesAndValues = async (propertiesValues) => {
  let values = await Promise.all(propertiesValues.map((pv) => {
    const {value} = pv
    return Values.findOrCreate({where: {"valueName": value}})
  }))

  let properties = await Promise.all(propertiesValues.map((pv) => {
    const {property} = pv
    return Properties.findOrCreate({where: {"propertyName": property}})
  }))
  
  return [
    properties.map(p => {
      return p[0].dataValues.propertyId
    }),
    values.map(v => {
      return v[0].dataValues.valueId
    })
  ]
}

const createPropertiesValues = async (itemId, valueIdList, propertyIdList) => {
  for (let i = 0; i < propertyIdList.length; i++) {
    let itemPropertiesWithValues = {itemId: itemId, valueId: valueIdList[i], propertyId: propertyIdList[i]}
    await PropertiesValues.create(itemPropertiesWithValues)
  }
}

module.exports = {
  findAllProperties,
  findAllValues,
  findAllPropertiesValues,
  createPropertiesAndValues,
  createPropertiesValues,
}
