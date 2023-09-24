import React, { useState, useEffect } from 'react'


export default function BalanceSheet({ticker}) {
    const [balanceSheet, setBalanceSheet] = useState([])
    const [schema, setSchema] = useState([])
    
    useEffect(() => {
        async function getBalSheet(ticker) {
            await fetch(`http://127.0.0.1:8000/api/bal_sheet/${ticker}`)
                  .then(response => response.json())
                  .then(res => {
                    setBalanceSheet(res.data)
                    setSchema(res.schema['fields'])
                  })
        }
        getBalSheet(ticker)
    }, [])
    return (
        <>
            {console.log(schema)}
            {console.log(balanceSheet)}
           <div className="financial-statement">
                <table className="block mx-auto">
                    <thead>
                        <tr>
                            <th></th>
                            {schema.map(field => (
                                field['name'] !== 'index' ?
                                <th>{field['name'].slice(0, 4)}</th> : null
                            ))} 
                        </tr>
                    </thead>
                    <tbody>
                       {balanceSheet.map(field => (
                        <tr className="even:bg-blue-white odd:bg-white" key={field['index']}>
                            <td className="whitespace-nowrap px-3 py-2">{field['index']}</td>
                            {schema.map(date => (
                                date['name'] !== 'index' ?
                                <td className="whitespace-nowrap px-3 py-2 text-center">{field[date['name']] ? (field[date['name']] / 10000000).toFixed(2) : "_"}</td> 
                                : null
                            ))}
                        </tr>
                       ))} 
                    </tbody>
                </table>
            </div> 
        </>
    )
}