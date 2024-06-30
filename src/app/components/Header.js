"use client";

// Import necessary dependencies
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "./hooks/useDebouncing";
import { SearchResultItems } from "./SearchResults";

//! Main Header component
const Header = () => {
  //! State for search query and results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //! Select cart items from Redux store
  const cartItems = useSelector((state) => state.cart?.items ?? []);

  //! Ref for search results container
  const searchRef = useRef(null);

  //! Function to fetch search results from API
  const fetchSearchResults = useCallback(async (query) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}&select=title,price,thumbnail,quantity,category`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  }, []);

  //! Debounced version of fetchSearchResults
  const debouncedFetchSearchResults = useDebounce(fetchSearchResults, 500);

  //! Handler for search input changes
  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      if (query) debouncedFetchSearchResults(query);
      else setSearchResults([]);
    },
    [debouncedFetchSearchResults]
  );

  //! Effect to handle clicks outside of search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //! Render header component
  return (
    <header className="bg-white sticky top-0 shadow-md z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/products" className="flex items-center">
            <Image src="/favicon.ico" alt="Cart Icon" width={24} height={24} />
            <span className="ml-2 font-semibold text-gray-800">
              Next Products
            </span>
          </Link>

          {/* Search input and results */}
          <div className="ml-2 flex relative" ref={searchRef}>
            <input
              type="text"
              className="w-48 sm:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />

            {searchResults?.length > 0 && (
              <div className="absolute shadow-xl mt-1 w-[550px] bg-white rounded-md z-20 top-10 right-20 max-h-80 overflow-y-auto">
                <ul className="cursor-pointer">
                  {searchResults?.map((result, idx) => (
                    <SearchResultItems key={idx + result.id} result={result} />
                  ))}
                </ul>
              </div>
            )}

            {/* Cart link */}
            <Link
              href="/cart"
              className="flex items-center ml-2 gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
            >
              <div className="relative cursor-pointer">
                <Image src="/cart.svg" alt="Cart Icon" width={24} height={24} />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                    {cartItems?.length}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
