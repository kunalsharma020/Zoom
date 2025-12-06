const server = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ?
    "https://zoombackend-xd0f.onrender.com" :
    "https://zoombackend-xd0f.onrender.com");

export default server;
