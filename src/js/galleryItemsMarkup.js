// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const galleryItem = document.querySelector('.gallery');

function galleryItemsMarkup(images) {
    return images.map((image) => {
        return ` <div class="photo-card">
                    <a href="${image.largeImageURL}">
                    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                    </a>
                        <div class="info">
                            <p class="info-item">
                                <b>'${image.likes}'</b>
                            </p>
                            <p class="info-item">
                                <b>'${image.views}'</b>
                            </p>
                            <p class="info-item">
                                <b>'${image.comments}'</b>
                            </p>
                            <p class="info-item">
                                <b>'${image.downloads}'</b>
                            </p>
                        </div>
                </div>`;
    }).join("");
}

galleryItem.insertAdjacentHTML('beforeend', galleryItemsMarkup(images));

export { galleryItem };

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.