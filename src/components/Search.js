import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');

    const [results, setResults] = useState([]); 


    // useEffect cannot mark any functions as async inside of useEffect
    // need to assign it to a variable
    useEffect(() => {
        const search = async () => {
          const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query', 
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                }
          });  
          setResults(data.query.search);
        };

        if (term) {
            search();
        }
       
    }, [term]); // re-render whenever our component or term has changed or first render


    // ?action=query&list=search&format=json&origin=*&srsearch=programming

    const renderedResults = results.map((result) => {
        return (
        <div key={result.pageid} className="item">
            <div className="right floated content">
                <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
            </div>
            <div className="content">
                <div className="header">
                    {result.title}
                </div>
                <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
            </div>
        </div>
        )
    });



    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input value={term} onChange={e => setTerm(e.target.value)} className="input" />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;