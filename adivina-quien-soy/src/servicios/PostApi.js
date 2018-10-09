export function PostApi(tipo,datos){
    let url = 'http://localhost:3005/api';
    
    return new Promise((resolve,reject) => {
        fetch(url+tipo,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
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