import { getUrl } from "./api.js";

const refs = {
    form: document.querySelector('.search-form'),
    wrapper: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more')
}

let page = 1;
let squery = "";

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSubmit(ev) {
    ev.preventDefault();
    const value = ev.currentTarget.elements.searchQuery.value.trim();
    if (value === "") return;
    page = 1;
    clearWrapper();
    squery = value;
    const res = await getUrl(value, page); 
    createMurkup(res);
    refs.form.reset();
}

async function onLoadMore() {
    page += 1;
    const res = await getUrl(squery, page); 
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
     refs.wrapper.insertAdjacentHTML('beforeend', murkup);
}

function clearWrapper() {
    refs.wrapper.innerHTML = '';
}

