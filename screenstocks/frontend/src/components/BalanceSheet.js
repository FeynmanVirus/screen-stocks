import React, { useState, useEffect } from 'react'


export default function BalanceSheet({ticker}) {
    const [balanceSheet, setBalanceSheet] = useState([])
    console.log(ticker)
    useEffect(() => {
        async function getBalSheet(ticker) {
            await fetch(`http://127.0.0.1:8000/api/bal_sheet/${ticker}`)
                  .then(response => response.json())
                  .then(res => {
                    setBalanceSheet(res.data)
                  })
        }
        getBalSheet(ticker)
    }, [])
    return (
        <>
           <div className="financial-statement">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="">2023</th>
                            <th>2022</th>
                            <th>2021</th>
                        </tr>
                    </thead>
                    <tbody>
                       {balanceSheet.map(field => (
                        <tr className="" key={field['index']}>
                            <td className="whitespace-nowrap px-3 py-2">{field['index']}</td>
                            <td className="whitespace-nowrap px-3 py-2">{field['2023-03-31T00:00:00.000'] ? field['2023-03-31T00:00:00.000'] / 1000 : '_'}</td>
                            <td className="whitespace-nowrap px-3 py-2">{field['2022-03-31T00:00:00.000'] ? field['2022-03-31T00:00:00.000'] / 1000 : '_'}</td>
                            <td className="whitespace-nowrap px-3 py-2">{field['2021-03-31T00:00:00.000'] ? field['2021-03-31T00:00:00.000'] / 1000 : '_'}</td>
                        </tr>
                       ))} 
                    </tbody>
                </table>
            </div> 
        </>
    )
}