import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29465980-7b99950ec6153fcb016c43dc5'

// axios.defaults.baseURL =
//   'https://pixabay.com/api?key=29465980-7b99950ec6153fcb016c43dc5';

export default class PixabayApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    }

    async fetchGallery() {
        try {
            const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);
            return response;
        } catch (error) {
            console.log(error);
            
        }
    };

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
