export function GetApi(tipo,datos){
    let url = 'http://localhost:3005/api/';
    
    return new Promise((resolve,reject) => {
        fetch(url+tipo,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error)
        });
    });
}