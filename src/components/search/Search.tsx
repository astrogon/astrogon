import type { SearchableEntry } from "@/types"
import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import { plainify } from "@lib/textConverter";

const descriptionLength = 200;

interface Props {
  searchList: SearchableEntry[];
}

interface SearchResult {
  item: SearchableEntry;
  refIndex: number;
}

const getPath = (entry: SearchableEntry) => {
  return `${entry.collection}/${entry.id.replace("-index", "")}`;
};

const SearchPage = ({ searchList }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.description", "id", "collection", "body"],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <section className="section-sm">
      <div className="container">
        <div className="row mb-10 justify-center">
          <div className="col-10 lg:col-8 px-0">
            <div className="flex flex-nowrap">
              <input
                className="w-full glass rounded-lg px-6 py-4 text-txt-p placeholder:text-txt-light dark:placeholder:text-darkmode-txt-light focus:border-darkmode-border focus:ring-transparent dark:text-darkmode-txt-light intersect:animate-fadeDown opacity-0 intersect-no-queue"
                placeholder="search posts"
                type="search"
                name="search"
                value={inputVal}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                ref={inputRef}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {searchResults?.length < 1 ? (
            <div className="col-10 lg:col-8 mx-auto p-2 text-center glass rounded-lg intersect:animate-fadeUp opacity-0">
              <p>
                {inputVal.length < 1
                  ? "Looking for something?"
                  : "We couldn't find what you searched for. Try searching again."}
              </p>
            </div>
          ) : (
            searchResults?.map(({ item }, index) => (
              <div className="py-2 px-0" key={`search-${index}`}>
                <div className="h-full glass col-10 lg:col-8 mx-auto rounded-lg p-4 intersect:animate-fade opacity-0">
                  <h4 className="mb-2">
                    <a href={"/" + getPath(item)}>
                      {item.data.title}
                    </a>
                  </h4>
                  { item.data.description && (
                    <p className="">{item.data.description}</p>
                  )}
                  {  !item.data.description && item.data.autodescription && item.body && (
                    <p className="">{plainify(item.body.slice(0, descriptionLength))}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
