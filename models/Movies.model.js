
class Movies {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.avera_gevote = obj.vote_average;
        this.popularity = obj.popularity;
        this.release_date = obj.release_date;
        this.img = `https://image.tmdb.org/t/p/original${obj.poster_path}`;
    }
}


module.exports = Movies;

