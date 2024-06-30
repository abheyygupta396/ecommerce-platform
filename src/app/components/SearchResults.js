"use client";

// Import necessary dependencies
import Image from "next/image";
import React from "react";
import { CounterButtons } from "./CounterButtons";

//! Memoized component for individual search result items
export const SearchResultItems = React.memo(({ result }) => (
  <li className="p-2 hover:bg-gray-100">
    <div className="flex justify-between">
      <div className="flex items-center">
        <Image
          src={result.thumbnail}
          alt={result.title}
          width={50}
          height={40}
          className="mr-2"
        />
        <span>{result.title}</span>
      </div>
      <CounterButtons
        id={result.id}
        title={result.title}
        price={result.price}
        image={result.thumbnail}
      />
    </div>
    <div className="flex justify-between">
      <span className="block text-gray-500">Category - {result.category}</span>
      <span className="block text-gray-500">₹{result.price}</span>
    </div>
  </li>
));
