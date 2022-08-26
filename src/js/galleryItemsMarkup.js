// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

//const galleryItem = document.querySelector('.gallery');

function galleryItemsMarkup(images) {
    return images.map((image) => {
        return ` <div class="photo-card">
                    <a class="photo-card__link" href="${image.largeImageURL}">
                    <img class="photo-card__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                    </a>
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>
                                <b>'${image.likes}'</b>
                            </p>
                            <p class="info-item">
                                <b>Views</b>
                                <b>'${image.views}'</b>
                            </p>
                            <p class="info-item">
                                <b>Comments</b>
                                <b>'${image.comments}'</b>
                            </p>
                            <p class="info-item">
                                <b>Downloads</b>
                                <b>'${image.downloads}'</b>
                            </p>
                        </div>
                </div>`;
    }).join("");
}

//galleryItem.insertAdjacentHTML('beforeend', galleryItemsMarkup(images));

export { galleryItemsMarkup };

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.