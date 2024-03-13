import { useEffect, useState } from "react";

interface Ayah {
  number: number;
  text: string;
}

interface Surah {
  number: number;
  name: string;
  ayahs: Ayah[];
}

function Quran(): JSX.Element {
  const [verseData, setVerseData] = useState<Surah[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://api.alquran.cloud/v1/quran/quran-uthmani"
      );
      const data = await response.json();
      setVerseData(data?.data?.surahs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main w-1/2 m-auto p-4  text-right">
      {loading ? (
        <div className="flex items-center justify-center h-[100vh] text-center">
          <img src="./imgs/loader.gif" alt="" />
        </div>
      ) : (
        <ul>
          {verseData?.map((item, itemIndex) =>
            loading ? (
              <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : (
              <div key={itemIndex} className="box my-6 p-4">
                <ul>
                  <li className="font-bold text-5xl text-center my-4">
                    {item?.name}
                  </li>
                </ul>
                {item?.ayahs?.slice(0)?.map((text, index) => (
                  <span key={index} className="text-5xl leading-9">
                    {text?.text}
                  </span>
                ))}
              </div>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default Quran;
