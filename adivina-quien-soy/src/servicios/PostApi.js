export function PostApi(tipo,token,datos){
    let url = 'http://192.168.1.3:3005/api/';
    
    return new Promise((resolve,reject) => {
        fetch(url+tipo,{
            method: 'POST',
            headers:{
                'x-access-token': token,
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