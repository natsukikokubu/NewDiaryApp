import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Diary } from "../../types/diary";
import { Button } from "../components/button";
import { useRouter } from "next/router";
import { useState } from "react";

type ServerProps = { diaries: Diary[] };

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const res = await fetch(`${getApiBaseUrl(req)}/diaries`).then((res) =>
    res.json()
  );
  return {
    props: { diaries: res.data },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(props: Props) {
  const router = useRouter();
  const [deleted, setDeleted] = useState(false);
  const handleClickNewDiary = () => {
    router.push("/new");
  };
  const handleClickDeleteButton = async (id: number) => {
    await fetch(`/api/diaries/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
    }).then(() => {
      setDeleted(true);
      router.replace(router.asPath);
    });
  };
  return (
    <main className="text-gray-700">
      <h1 className="text-5xl font-bold my-4 ">Diary App</h1>
      <div>
        <h2 className="text-4xl font-semibold my-4">日記一覧</h2>
        <Button size="large" onClick={handleClickNewDiary}>
          + 日記作成
        </Button>
      </div>
      <div>
        <div>
          {deleted && (
            <div>
              <p>削除しました</p>
            </div>
          )}
        </div>
        {props.diaries.map((diary) => (
          <div
            key={diary.id}
            className="w-320px border border-gray-600 rounded-lg p-4 my-4"
          >
            <h3 className="text-xl font-bold mb-2">{diary.title}</h3>
            <h4 className="text-lg mb-2">{diary.date}</h4>
            <p className="text-lg mb-2">{diary.content}</p>

            <div>
              <a
                className="border border-x-2 border-y-2 border-blue-700  text-gray-800 font-bold py-2 px-6 rounded-full"
                href={`/${diary.id}/edit`}
              >
                編集
              </a>
              <button
                className="border border-x-2 border-y-2 border-blue-700  text-gray-800 font-bold py-2 px-6 rounded-full"
                onClick={() => handleClickDeleteButton(diary.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
