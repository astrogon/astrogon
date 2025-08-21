import type { SearchableEntry } from "@/types";
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
    const inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
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
          <div className="col-10 px-0 lg:col-8">
            <div className="flex flex-nowrap">
              <input
                className="glass intersect-no-queue w-full rounded-lg px-6 py-4 text-txt-p opacity-0 placeholder:text-txt-light focus:border-darkmode-border focus:ring-transparent intersect:animate-fadeDown dark:text-darkmode-txt-light dark:placeholder:text-darkmode-txt-light"
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
            <div className="glass col-10 mx-auto rounded-lg p-2 text-center opacity-0 lg:col-8 intersect:animate-fadeUp">
              <p>
                {inputVal.length < 1
                  ? "Looking for something?"
                  : "We couldn't find what you searched for. Try searching again."}
              </p>
            </div>
          ) : (
            searchResults?.map(({ item }, index) => (
              <div className="px-0 py-2" key={`search-${index}`}>
                <div className="glass col-10 mx-auto h-full rounded-lg p-4 opacity-0 lg:col-8 intersect:animate-fade">
                  <h4 className="mb-2">
                    <a href={"/" + getPath(item)}>{item.data.title}</a>
                  </h4>
                  {item.data.description && (
                    <p className="">{item.data.description}</p>
                  )}
                  {!item.data.description &&
                    item.data.autodescription &&
                    item.body && (
                      <p className="">
                        {plainify(item.body.slice(0, descriptionLength))}
                      </p>
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
