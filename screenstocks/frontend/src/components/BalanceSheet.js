import React, { useState, useEffect } from 'react'

export default function BalanceSheet({ticker}) {
    const [balanceSheet, setBalanceSheet] = useState([])
    const [assets, setAssets] = useState([])
    const [liabilities, setLiabilities] = useState([])
    const [equity, setEquity] = useState([])
    const [other, setOther] = useState([])
    const [schema, setSchema] = useState([])
    const totals = {}
    const assetCategories = [
  'Total Assets', 'Total Non Current Assets', 'Other Non Current Assets', 
  'Non Current Prepaid Assets', 'Non Current Deferred Taxes Assets', 
  'Investment in Financial Assets', 'Available For Sale Securities', 
  'Financial Assets Designated as Fair Value Through Profit or Loss Total', 
  'Long Term Equity Investment', 'Investments in Joint Ventures at Cost', 
  'Investments in Associates at Cost', 'Goodwill And Other Intangible Assets', 
  'Other Intangible Assets', 'Goodwill', 'Net PPE', 'Accumulated Depreciation', 
  'Gross PPE', 'Construction In Progress', 'Other Properties', 
  'Machinery Furniture Equipment', 'Buildings And Improvements', 
  'Land And Improvements', 'Properties'
];

    const liabilityCategories = [
    'Total Liabilities Net Minority Interest', 
    'Total Non Current Liabilities Net Minority Interest', 
    'Other Non Current Liabilities', 
    'Trade and Other Payables Non Current', 
    'Non Current Deferred Taxes Liabilities', 
    'Long Term Debt And Capital Lease Obligation', 
    'Long Term Capital Lease Obligation', 
    'Long Term Debt', 'Long Term Provisions', 'Current Liabilities', 
    'Other Current Liabilities', 
    'Current Debt And Capital Lease Obligation', 
    'Current Capital Lease Obligation', 
    'Current Debt', 'Current Provisions', 'Payables', 'Other Payable', 
    'Dividends Payable', 'Accounts Payable'
    ];

    const equityCategories = [
    'Common Stock Equity', 'Total Capitalization', 
    'Total Equity Gross Minority Interest', 'Minority Interest', 
    'Stockholders Equity', 'Other Equity Interest', 'Retained Earnings', 
    'Additional Paid In Capital', 'Capital Stock', 'Common Stock'
    ];
    // fetch balance sheet
    useEffect(() => {
        async function getBalSheet(ticker) {
            await fetch(`http://127.0.0.1:8000/api/bal_sheet/${ticker}`)
                  .then(response => response.json())
                  .then(res => {
                    setSchema(res.schema['fields'])
                    setBalanceSheet(res.data)
                    balanceSheet.map(field => {
                        if (field.index.includes('Total')) {
                            totals[field.index] = field
                        }
                        if (assetCategories.includes(field.index)) {
                            setAssets((prevAssets) => [...prevAssets, field])
                        } else if (liabilityCategories.includes(field.index)) {
                            setLiabilities((prevLiabilities) => [...prevLiabilities, field])
                        } else if (equityCategories.includes(field.index)) {
                            setEquity((prevEquity) => [...prevEquity, field])
                        } else {
                            setOther((prevOther) => [...prevOther, field])
                        }
                    })
                  })
        }
        getBalSheet(ticker)
    }, [])

   // ▼

    function extendAssets(e) {
    }

    return (
        <>
           <div className="financial-statement">
                <span className="text-4xl font-bold p-2">Balance Sheet</span>
                <span className="block p-2">Consolidated figures in Rs. Crores</span>
                <table className="block mx-auto">
                    <thead>
                        <tr>
                            <th></th>
                            {schema.map(field => (
                                field['name'] !== 'index' ?
                                <th key={field['name']}>{field['name'].slice(0, 4)}</th> : null
                            ))} 
                        </tr>
                    </thead>
                    <tbody> 
                        {/* <tr className="even:bg-blue-white odd:bg-white" key={assets['Total Assets']}>
                            <td>Total Assets <button className="text-blue-400 hover:text-blue-600" onClick={extendAssets}>+</button></td>
                            {schema.map(date => (
                                date['name'] !== 'index' ?
                                <td className="whitespace-nowrap px-3 py-2 text-center">{(assets['Total Assets'][date['name']] / 10000000).toFixed(0) || "_"}</td>
                                : null
                            ))}
                        </tr> */}
                        
                    </tbody>
                </table>
            </div> 
        </>
    )
}