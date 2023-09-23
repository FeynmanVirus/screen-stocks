import { useLocation } from 'react-router-dom';
import BalanceSheet from "../components/BalanceSheet"

export default function Financials() {
    const data = useLocation().state;
    return (
        <>  
           <BalanceSheet ticker={data.ticker} />
        </>
    )
}