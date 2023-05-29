import axios from "axios";

const API_key = '25848819-9cdff21383665c4a2b048e17c';

async function getUrl(query, page) {
    const { data } = await axios.get(`https://pixabay.com/api/?key=${API_key}&q=${query}&image_type=photo&per_page=40&page=${page}&orientation=horizontal&safesearch=true`);
    return data.hits;
}

export { getUrl };