import { useState, useEffect } from 'react';
import Spinner from '../apiner/spiner';
import MarvelService from '../../services/Service';
import ErrorMesage from '../errorMesage/ErrorMesage';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const marvelService = new MarvelService();
    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const onChatLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    const onCharLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService.getCharacter(id).then(onChatLoaded).catch(onError);
    };

    const errorMesage = error ? <ErrorMesage /> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMesage}
            {spiner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, discription, thumbnail, homepage, wiki } = char;
    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }
    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{discription}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
