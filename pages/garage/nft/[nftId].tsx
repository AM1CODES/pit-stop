import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import GarageCard from '../../../components/GarageCard';
import Navbar from '../../../components/Navbar';
import NFTCard from '../../../components/NFTCard';
import { RootState } from '../../../store/rootReducer';
import TEAMS from '../../../data/teams.json';
import useNFTMarket from '../../../hooks/useNFTMarket';
import withAuth from '../../../hoc/withAuth';
import Image from 'next/image';

const GarageNFT: NextPage = () => {
  const router = useRouter();
  const { nftId } = router.query;
  console.log(nftId);

  const [sellingPrice, setSellingPrice] = useState('0');

  const { garage } = useSelector((state: RootState) => state.garage);

  const nft = useMemo(
    () => garage.find((item: any) => item.itemId == nftId),
    [garage]
  );

  console.log(nft);

  const description = useMemo(
    () =>
      nft
        ? TEAMS.find((t) => t.livery === nft.image.split('/')[4])?.description
        : '',
    [nft]
  );

  const { listItemOnMarketplace } = useNFTMarket();

  async function sellNFT() {
    console.log(sellingPrice);

    if (sellingPrice) listItemOnMarketplace(nftId as string, sellingPrice);
  }

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
          <div className="w-1/2 text-left mt-3">
            <div>
              <h1 className="text-white text-4xl font-bold">{nft.name}</h1>

              <p className="my-4 text-white text-base">{description}</p>
            </div>
            {!nft.sold ? (
              <>
                <div className="flex w-3/5 justify-between">
                  <div>
                    <h3 className="text-gray-mute mt-8 text-xl font-semibold">
                      Selling Price
                    </h3>
                    <div className="flex items-center mt-1">
                      <Image
                        src={require(`../../../public/img/matic.svg`)}
                        width={42}
                        height={21}
                      />
                      <span className="text-white text-2xl ml-2 font-bold">
                        <input
                          type="number"
                          min={0}
                          className="inline w-32 border-b-2 border-white text-2xl outline-none mr-3 font-bold"
                          style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                          onChange={(e) => setSellingPrice(e.target.value)}
                          value={sellingPrice}
                        />{' '}
                        MATIC
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-mute mt-8 text-xl font-semibold">
                      Points
                    </h3>
                    <span className="text-white text-2xl mt-1 font-bold">
                      {nft.points}
                    </span>
                  </div>
                </div>
                <button
                  className="border-2 border-black my-7 bg-gradient-to-r from-redOne to-redTwo rounded-lg w-64 py-2 text-white text-2xl font-bold"
                  onClick={async () => sellNFT()}
                >
                  Sell
                </button>
              </>
            ) : (
              <div className="flex w-3/5 justify-between">
                <div>
                  <h3 className="text-gray-mute mt-8 text-xl font-semibold">
                    Bought For
                  </h3>
                  <div className="flex items-center mt-1">
                    <Image
                      src={require(`../../../public/img/matic.svg`)}
                      width={42}
                      height={21}
                    />
                    <span className="text-white text-2xl ml-2 font-bold">
                      {nft.price} MATIC
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-mute mt-8 text-xl font-semibold">
                    Points
                  </h3>
                  <span className="text-white text-2xl mt-1 font-bold">
                    {nft.points}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(GarageNFT);
