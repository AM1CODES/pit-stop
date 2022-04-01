import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../../components/Navbar';
import NFTCard from '../../../components/NFTCard';
import TEAMS from '../../../data/teams.json';
import useNFTMarket from '../../../hooks/useNFTMarket';
import { RootState } from '../../../store/rootReducer';

const MarketplaceNFT: NextPage = () => {
  const router = useRouter();
  const { nftId } = router.query;
  console.log(nftId);

  const { marketplace } = useSelector((state: RootState) => state.marketplace);
  console.log(marketplace);

  const nft = useMemo(
    () => marketplace.find((item: any) => item.itemId == nftId),
    [marketplace]
  );

  console.log(nft);

  const description = useMemo(
    () =>
      nft
        ? TEAMS.find((t) => t.livery === nft.image.split('/')[4])?.description
        : '',
    [nft]
  );

  const { buyItem } = useNFTMarket();

  return (
    <div className="text-center h-screen flex flex-col text-red-700">
      <Head>
        <title>NFT | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {nft && (
        <div className="flex-1 flex p-10">
          <div className="w-1/2 flex flex-col items-center">
            <NFTCard img={nft.image} />
          </div>
          <div className="w-1/2 text-left">
            <div>
              <h1 className="text-white text-2xl font-bold">{nft.name}</h1>
              <h3 className="text-white text-sm my-2">
                Created by <span className="text-redOne">{nft.seller}</span>
              </h3>
              <p className="my-2 text-white text-base">{description}</p>
            </div>
            <h1 className="text-white text-2xl my-10 font-bold">
              Points: {nft.points}
            </h1>
            <h1 className="text-white text-2xl my-10 font-bold">
              Price: {nft.price} MATIC
            </h1>
            <button
              className="my-10 bg-gradient-to-r from-redTwo to-redTwo rounded-lg w-64 py-2 text-white text-2xl font-bold"
              onClick={async () => buyItem(nft)}
            >
              Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceNFT;