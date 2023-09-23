import React, { useState, useEffect } from 'react'

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const [lookup, setLookup] = useState("")
    
    useEffect(() => {
        async function lookupStock(query) {
            await fetch(`http://127.0.0.1:8000/api/lookup/${query}`)
            .then(response => response.json())
            .then(res => {
                setLookup(res)
                console.log('lookup')
                console.log(lookup)
            })
        }
        lookupStock(query)
    }, [query])
    return (
        <>
        <div className="sticky top-20 z-40 w-4/5 px-1 sm:p-5 md:p-10">
        <form className="relative">   
            <div className="flex justify-center items-center mt-10">
            <div className="relative inset-y-1 left-9 pb-2 align-middle">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} id="default-search" className="block w-full p-4 pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Here..." required />
            </div>
            <ul className="bg-white border border-gray-100 w-4/5 ml-8 mt-2 overflow-hidden">
            {lookup ? lookup.map(stock => (
            <a href="#"><li key={stock.shortname} className=" py-1 border-b-2 border-gray-100  cursor-pointer hover:bg-blue-100 hover:text-gray-900">
                <span>{stock.shortname} <span>{stock.exchDisp}</span></span>
            </li></a>
        )) : console.log('null')}
            </ul>
        </form>
        </div>
        </>
    )
}
