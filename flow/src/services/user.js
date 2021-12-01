export function getUser(){
    let user = localStorage.getItem('user')
    return JSON.parse(user)
}