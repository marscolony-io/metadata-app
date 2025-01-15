import { clny, ls } from "../blockchain/contracts";

const TTL = 100000; // expiration of cache in ms

type StatData = {
  burned: number;
  minted: number;
  avg: number;
  max: number;
};

const getStatFromContract = async (): Promise<StatData | null> => {
  try {
    const data = await ls.methods.getClnyStat().call();
    console.log("getStatFromContract data", data);

    const clnyTotalSupply = await clny.methods.totalSupply().call();
    console.log("clnyTotalSupply", clnyTotalSupply / 10 ** 18);
    return {
      // minted: data.minted,
      minted: Math.round(clnyTotalSupply / 10 ** 18),
      burned: data.burned,
      avg: data.avg,
      max: data.max,
    };
  } catch (error: any) {
    console.log("getStatFromContract error", error);
    return null;
  }
};

let cachedStatData: StatData | null = null;

const isCacheExpired = (lastUpdateTime: Date): boolean => {
  const diff = new Date().getTime() - lastUpdateTime.getTime();
  return diff > TTL;
};

(async () => {
  let lastUpdateTime = new Date(0);
  while (true) {
    const statData = await getStatFromContract();

    if (!statData && isCacheExpired(lastUpdateTime)) {
      cachedStatData = {
        burned: 0,
        minted: 0,
        avg: 0,
        max: 0,
      };
    } else {
      cachedStatData = statData;
      lastUpdateTime = new Date();
    }

    await new Promise((rs) => setTimeout(rs, 10123));
  }
})();

export const getLandStatCachedData = (): StatData => {
  return (
    cachedStatData ?? {
      minted: 0,
      burned: 0,
      avg: 0,
      max: 0,
    }
  );
};
