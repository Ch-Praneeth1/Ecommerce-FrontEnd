
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({data})
  });
}


export function fetchProductsByFilters(filter,sort) {


    //filter = {"cateogry":"smartphone"}
  let queryString = '';
  for(let key in filter){
      const categoryValues = filter[key];
      if(categoryValues.length){
        const lastcategoryValue = categoryValues[categoryValues.length-1]
        queryString += `${key}=${lastcategoryValue}&`
    }
  }
  for(let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }
  // console.log(queryString)
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json()
    resolve({data})
  });
}


export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({data})
  });
}