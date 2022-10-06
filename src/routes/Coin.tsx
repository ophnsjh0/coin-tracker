// import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useParams, useRouteMatch } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinTickers } from "./api";


const Container = styled.div`
    padding : 0px 20px;
    margin: 0 auto;
    max-width: 300px;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loder = styled.span`
    text-align: center;
    display: block;
`;

const Title = styled.div`
    display : flex;
    align-items: center;
    color: ${(props) => props.theme.accentColor};
    font-size: ${(props) => props.theme.fontsize};
    a {
        display: flex;
        align-items: center;
        justify-content: center; 
    }
`;


const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size : 10px;   
    span:first-child {
        font-size: 6px;
        font-weight: 200;
        color : #FBCFCD;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
    font-size: 11px;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 20px 0px;
    gap: 10px;
`;

const Tab = styled.span < { isActive: boolean } >`
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

const HomeButton = styled.div `
    display : flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-left : 10px;
`;

interface RouterParam {
    coinId: string;
}

interface RouteState {
    name: string;
}

//api object type 확인 
//[1] key 가져오기 
//1. console.log("Fetch Data") 실행 후 Console에서 데이터 확인  
//2. Console에서 API 데이터 우클릭 후 "Store object as global variable" 선택하여 Object 데이터를 temp1, 2 ... 저장
//3. Console에서 "Object.keys(temp1).join()" 함수를 실행하여 key 목록을 가져옴 
//4. ","을 선택후 Ctrl + D를 이용하여 ","를 모두 선택 삭제 후 엔터 
//5. 객체 모두 선택 후 Alt + Shift + i 로 선택한 모든 문자열 가장 우측 끝으로 포커싱  
//[2] type 가져오기 
//1. Console에서 "Object.value(temp1).map(v => typeof v).join()" 함수를 이용하여 객체의 value값의 type을 가져옴 
//2. ","을 선택후 Ctrl + D를 이용하여 ","를 모두 선택 삭제 후 엔터
//3. 객체 모두 선택 후 Alt + Shift + i 로 선택한 모든 문자열 가장 우측 끝으로 포커싱 
interface Itag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    parent: object;
    tags: Itag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
    whitepaper: {
        link: string;
    }
}

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

interface ICoinProps {
}

function Coin({ }: ICoinProps) {
    const { coinId } = useParams<RouterParam>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinid/price");
    const chartMatch = useRouteMatch("/:coinid/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId),
        {
            refetchInterval: 10000,
        }
    )
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId],
        () => fetchCoinTickers(coinId), { refetchInterval: 10000, });
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const coinData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPriceInfo(coinData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);
    const loading = infoLoading || tickersLoading
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>
                    <Link
                        to={{
                            pathname: `/`,
                        }}>
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLocaleLowerCase()}`} />
                        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                        <HomeButton> 🏠 </HomeButton>
                    </Link>
                </Title>  
            </Header>
            {loading ? (<Loder>Loading .....</Loder>
            ) : (
                <>

                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>
                        <div>{infoData?.description}</div>
                    </Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>CHART</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>PRICE</Link>
                        </Tab>
                    </Tabs>
                    <Switch>
                        <Route path={`/${coinId}/price`}>
                            <Price coinId={coinId} />
                        </Route>
                        <Route path={`/${coinId}/chart`}>
                            <Chart coinId={coinId} />
                        </Route>
                    </Switch>
                </>
            )
            }
        </Container >
    )
}

export default Coin