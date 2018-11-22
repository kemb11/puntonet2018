export function GetApi(tipo,datos){
    let url = 'http://192.168.1.3:3005/api/';
    
    return new Promise((resolve,reject) => {
        fetch(url+tipo,{
            method: 'GET',
            headers:{
				'x-access-token': datos,
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