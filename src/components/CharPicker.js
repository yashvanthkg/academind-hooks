import React from 'react';
import './CharPicker.css';
import { useHttp } from '../components/hooks/https';

const  CharPicker = (props) => {

    const [isLoading, fetchedData] = useHttp('https://swapi.dev/api/people/', [])

    const selectedChars = fetchedData
    ? fetchedData.results
    .slice(0,5)
    .map((char, index) => ({
        name: char.name,
        id: index+1
    })) : [];

    let content = <p>Loading characters...</p>;
    if (
        !isLoading &&
        selectedChars &&
        selectedChars.length > 0
    ) {
        content = (
        <select
            onChange={props.onCharSelect}
            value={props.selectedChar}
            className={props.side}
        >
            {selectedChars.map(char => (
            <option key={char.id} value={char.id}>
                {char.name}
            </option>
            ))}
        </select>
        );
    } else if (
        !isLoading &&
        (!selectedChars || selectedChars.length === 0)
    ) {
        content = <p>Could not fetch any data.</p>;
    }
    return content;
}

export default CharPicker;