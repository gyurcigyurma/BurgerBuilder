import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://learnburger-72a11.firebaseio.com/'
})

export default instance;