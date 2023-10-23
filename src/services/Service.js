class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2b64da38e76cf4f5f46c09089e989885';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Cloude not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacter = async (offset = this._baseOffset) => {
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            discription: char.description
                ? `${char.description.slice(0, 210)}...`
                : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };
}

export default MarvelService;
