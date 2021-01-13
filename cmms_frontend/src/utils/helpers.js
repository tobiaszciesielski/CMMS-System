
// replace 'Item Name' with 'item_name'

function toCamelCase(str) {  
  return str.charAt(0).toLowerCase()+str.slice(1).replace(' ', '')
}

export {
  toCamelCase
}