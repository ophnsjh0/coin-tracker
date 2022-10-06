import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";

const Container = styled.div`
    margin: 0 auto;
    max-width: 300px;
`;

const Loder = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    flex-direction : column;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    justify-content: space-between;
    font-size : 10px;   
    margin : 5px;
    span:first-child {
        font-size: 6px;
        font-weight: 200;
        color : #FBCFCD;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;


interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
};

interface PriceProp {
    coinId: string;
}

function Price({ coinId }: PriceProp) {
    console.log(coinId)
    const { isLoading , data: priceData } = useQuery<PriceData>(["price", coinId],  () => fetchCoinTickers(coinId), { refetchInterval: 5000, });
    return (
        <Container>
        {isLoading ? (<Loder>Loading .....</Loder>
        ) : (
            <>

                <Overview>
                   
                    <OverviewItem>
                        <span>날짜</span>
                        <span>  $ {priceData?.quotes?.USD?.ath_date}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>시가총액 </span>
                        <span>  $ {priceData?.quotes?.USD?.market_cap?.toFixed(3)}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>시가총액 변동(24시)</span>
                        <span>  {priceData?.quotes?.USD?.market_cap_change_24h?.toFixed(3)} % </span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>가격</span>
                        <span>  $ {priceData?.quotes?.USD?.price?.toFixed(3)}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>1시간</span>
                        <span>  {priceData?.quotes?.USD?.percent_change_1h?.toFixed(3) } %</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>24시간</span>
                        <span>  {priceData?.quotes?.USD?.percent_change_24h?.toFixed(3)} %</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>1주일</span>
                        <span>  {priceData?.quotes?.USD?.percent_change_7d?.toFixed(3)} %</span>
                    </OverviewItem>
                </Overview>

            </>
        )
        }
    </Container >
    )
}

export default Price;