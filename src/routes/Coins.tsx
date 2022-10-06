// import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { isPropertySignature } from "typescript";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";


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

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
    font-size: 10px;
    border: 1px solid white;
    a {
        padding: 15px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: ${(props) => props.theme.fontsize};
`;

const Loder = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;



interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinsProps {
}

function Coins({ }: ICoinsProps) {
    const { isLoading, data } = useQuery<CoinInterface[]>('allCoins', fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const ToggleDarkAtom = () => setDarkAtom((prev) => !prev);
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={ToggleDarkAtom}>Toggle Button</button>
            </Header>
            {isLoading ? (<Loder>Loading .....</Loder>)
                : (
                    <CoinList>
                        {data?.slice(0, 100).map((coin) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`,
                                        state: { name: coin.name }
                                    }}>
                                    <Img
                                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        ))}
                    </CoinList>
                )}
        </Container>
    )
}

export default Coins