import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../store/suggestionSlice";

const RenderSuggestions = ({ suggestionsData }) => {
  return (
    <>
      {suggestionsData?.map((item) => {
        return (
          <div key={item.id}>
            <div className="p-2">{`🔎${item.name}`}</div>
          </div>
        );
      })}
    </>
  );
};

// with redux as state variable
const Debouncing = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState([]);

  const dispatch = useDispatch();
  const cacheSuggestions = useSelector((store) => store.suggestions);

  const fetchData = async () => {
    console.log("from api");

    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    const data = await res.json();
    setSuggestionsData(data?.recipes);
    dispatch(cacheResults({ [query]: data?.recipes }));
  };

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      if (cacheSuggestions[query]) {
        console.log("from cache");
        setSuggestionsData(cacheSuggestions[query]);
      } else {
        fetchData();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex flex-col justify-center">
      <div className="mt-10 pl-10 w-full">
        <input
          className="p-2 rounded-2xl w-[40%]  border border-gray-700"
          type="text"
          name="search"
          placeholder="Search Query"
          id="search"
          value={query}
          autoComplete="off"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {showSuggestions && (
        <div className=" max-h-100 overflow-y-scroll divide-y-2 divide-gray-500 ml-10 w-100 shadow-md rounded-xl">
          <RenderSuggestions suggestionsData={suggestionsData} />
        </div>
      )}
    </div>
  );
};

export const Debouncing2 = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[query]) {
      console.log("from cache", query);

      setSuggestionsData(cache[query]);
      return;
    }

    console.log("from api", query);

    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    const data = await res.json();
    setSuggestionsData(data?.recipes);
    setCache((prev) => ({ ...prev, [query]: data?.recipes }));
  };

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex flex-col justify-center">
      <div className="mt-10 pl-10 w-full">
        <input
          className="p-2 rounded-2xl w-[40%]  border border-gray-700"
          type="text"
          name="search"
          placeholder="Search Query"
          id="search"
          value={query}
          autoComplete="off"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {showSuggestions && (
        <div className=" max-h-100 overflow-y-scroll divide-y-2 divide-gray-500 ml-10 w-100 shadow-md rounded-xl">
          <RenderSuggestions suggestionsData={suggestionsData} />
        </div>
      )}
    </div>
  );
};

export default Debouncing;
