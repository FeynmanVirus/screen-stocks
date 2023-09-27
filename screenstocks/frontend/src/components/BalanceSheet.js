import React, { useState, useEffect } from 'react'
import { OrganizeBalSheet, Structure} from './BalanceSheetStructure'

export default function BalanceSheet({ticker}) {
    const [balanceSheet, setBalanceSheet] = useState([])
    const [assets, setAssets] = useState([])
    const [liabilities, setLiabilities] = useState([])
    const [equity, setEquity] = useState([])
    const [schema, setSchema] = useState([])
    // build a structured balance_sheet dict
    let bal_sheet = {} 
    bal_sheet = Structure(bal_sheet)
    // fetch balance sheet
    useEffect(() => {
        async function getBalSheet(ticker) {
            await fetch(`http://127.0.0.1:8000/api/bal_sheet/${ticker}`)
                  .then(response => response.json())
                  .then(res => {
                    setSchema(res.schema['fields'])
                    res['data'].map(field => {
                        bal_sheet = OrganizeBalSheet(bal_sheet, field)
                        setBalanceSheet(bal_sheet)
                    })
                  })
        }
        getBalSheet(ticker)
    }, [])



    return (
        <>
        {console.log(balanceSheet)}
           <div className="financial-statement">
                <span className="text-4xl font-bold p-2">Balance Sheet</span>
                <span className="block p-2">Consolidated figures in Rs. Crores</span>
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
                        {/* <tr className="even:bg-blue-white odd:bg-white" key={field['index']}>
                            <td className="whitespace-nowrap px-3 py-2">{field['index']}</td>
                            {schema.map(date => (
                                date['name'] !== 'index' ?
                                <td className="whitespace-nowrap px-3 py-2 text-center">{field[date['name']] ? (field[date['name']] / 10000000).toFixed(0) : "_"}</td> 
                                : null
                            ))}
                        </tr> */}
                    </tbody>
                </table>
            </div> 
        </>
    )
}