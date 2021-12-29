import { useCallback, useState } from 'react';

import { DictionaryWord, Dictionary as DictionaryService } from '../../services/dictionary';

export const Dictionary = () => {
  const [results, setResults] = useState<DictionaryWord[]>([]);
  const [service] = useState(new DictionaryService());

  const search = useCallback((query: string) => {
    setResults(service.search(query));
  }, []);

  return (
    <div>
      <div>
        <input onChange={event => search(event.target.value)} />

        <div>
          {results.map(x => x.word).map(x => <div key={x}>{x}</div>)}
        </div>
      </div>
    </div>
  )
}
