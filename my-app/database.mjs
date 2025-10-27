const API_KEY = '2237fea974mshb7da06f3304f35dp141c59jsn7d24ae5d9c51';
async function getData(){
    try{
        const response = await fetch('https://imdb236.p.rapidapi.com/api/imdb/cast/nm0000190/titles',
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
                }
            }
        )
        const data = await response.json();
        console.log(typeof(data));

    }
    catch(error){
        console.error(error.message)
    }
}

getData();