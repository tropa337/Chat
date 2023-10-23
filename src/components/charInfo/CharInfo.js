import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../apiner/spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/Service';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        onChatLoading();
        marvelService.getCharacter(charId).then(onChatLoaded).catch(onError);
    };
    const onChatLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    const onChatLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMesage = error ? <ErrorMesage /> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMesage}
            {spiner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, discription, thumbnail, homepage, wiki, comics } = char;
    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'unset' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{discription}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Any comics whis this person'}
                {comics.map((item, i) => {
                    if (i > 9) {
                        return;
                    }

                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
