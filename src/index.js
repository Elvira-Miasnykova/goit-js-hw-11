//import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayApi from './js/fetchGallery';
import { galleryItemsMarkup } from './js/galleryItemsMarkup';

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('input[name="searchQuery"]'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryEl: document.querySelector('.gallery'),
}

const PixabayApiService = new PixabayApi();
//console.log(PixabayApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');

const lightbox = new SimpleLightbox('.photo-card a');

let searchQuery = '';

function onSearch(e) {
    e.preventDefault();
    //console.log(e.currentTarget.elements);
    //PixabayApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    PixabayApiService.searchQuery = refs.searchInput.value.trim();
        if (PixabayApiService.searchQuery === "") {
            Notify.failure("Sorry, this field must be filled");
            return;
        }
    refs.galleryEl.innerHTML = "";
    PixabayApiService.resetPage();
    //console.log(PixabayApiService.searchQuery);
    PixabayApiService.fetchGallery().then(({ data }) => {
        //console.log(data.hits);
        if (data.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            refs.loadMoreBtn.classList.add('is-hidden');
            return;
        } else
            if (data.hits.length <= PixabayApiService.perPage) {
                Notify.info(`Hooray! We found ${data.totalHits} images.`);
                appendGalleryItemsMarkup(data.hits);
                lightbox.refresh();
                PixabayApiService.incrementPage();
                refs.loadMoreBtn.classList.add('is-visible');
                return;
            }
    }).catch((error => console.log(error)));
};


function onLoadMore(e) {
    e.preventDefault();
    refs.galleryEl.innerHTML = '';
    PixabayApiService.fetchGallery().then(({ data }) => {
        const lastImage = data.totalHits - (PixabayApiService.perPage * PixabayApiService.page);
        appendGalleryItemsMarkup(data.hits);
        lightbox.refresh();
        //PixabayApiService.resetPage();
        PixabayApiService.incrementPage();

        const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
        if (lastImage <= 0) {
            Notify.failure(`We're sorry, but you've reached the end of search results.`);
            refs.loadMoreBtn.classList.add('is-hidden');

        }
    }).catch((error) => console.log(error));
}
    

function appendGalleryItemsMarkup(images) {
    refs.galleryEl.insertAdjacentHTML('beforeend', galleryItemsMarkup(images));
}
