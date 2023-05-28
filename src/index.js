import { getUrl } from "./api.js";
import { Notify } from "notiflix";

const refs = {
    form: document.querySelector('.search-form'),
    wrapper: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more')
}

let page = 1;
let squery = "";

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.btnLoadMore.classList.add('is-hidden');

async function onSubmit(ev) {
    ev.preventDefault();
    refs.btnLoadMore.classList.remove('is-hidden');
    const value = ev.currentTarget.elements.searchQuery.value.trim();
    if (value === "") {
        Notify.info("Enter a request")
        return
    } else
    page = 1;    
    clearWrapper();
    squery = value;
    
    const res = await getUrl(value, page); 
    if (res.length === 0) {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    createMurkup(res);
    refs.form.reset();
}

async function onLoadMore() {
    refs.btnLoadMore.setAttribute('disabled', true)
    page += 1;
    const res = await getUrl(squery, page); 
    createMurkup(res);
    refs.btnLoadMore.removeAttribute('disabled');
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

