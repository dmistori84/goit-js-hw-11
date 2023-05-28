import { getUrl } from "./api.js";

const refs = {
    form: document.querySelector('.search-form'),
    wrapper: document.querySelector('.gallery')
}

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    ev.preventDefault();
    const value = ev.currentTarget.elements.searchQuery.value.trim();
    if (value === "") return;
    const res = await getUrl(value); 
    console.log('onSubmit ~ res:', res)
    createMurkup(res);
}

 function createMurkup(arrHits) {
    const murkup = arrHits.map(hit =>  
`    <div class="photo-card">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes ${hit.likes}</b>
            </p>
            <p class="info-item">
                <b>Views ${hit.views}</b>
            </p>
            <p class="info-item">
                <b>Comments ${hit.comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${hit.downloads}</b>
            </p>
        </div>
    </div>        
    `).join('');
    console.log(murkup);
    refs.wrapper.insertAdjacentHTML('beforeend', murkup)
}

