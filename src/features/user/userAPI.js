export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('/users/mine')
    const data = await response.json()
    resolve({data})
  });
}


export function updateUser(update) {
  return new Promise(async (resolve) => {
    // console.log(update)
    const response = await fetch('/users/'+update.id,{
      method: "PATCH",
      body: JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  });
}