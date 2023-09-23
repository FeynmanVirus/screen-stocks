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
        
        </>
    )
}