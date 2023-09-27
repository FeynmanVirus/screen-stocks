import { useLocation, useNavigate } from 'react-router-dom';
import BalanceSheet from "../components/BalanceSheet"

export default function Financials() {
    const navigate = useNavigate()
    try {
    const data = useLocation().state;
    if (!data) {
        navigate('/')
    }
    return (
        <>  
           <BalanceSheet ticker={data.ticker} />
        </>
    ) 
  } catch (err) {
        navigate('/home')
  }
}