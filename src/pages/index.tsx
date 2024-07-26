import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Diary } from "../../types/diary";
import { Button } from "./button";
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
  const handleClickNewDiary = () => {
    router.push("/new");
  };
  return (
    <main>
      <h1 className="text-5xl font-bold">diary App</h1>
      <h2 className="text-4xl font-semibold">日記一覧</h2>
      <Button size="large" onClick={handleClickNewDiary}>
        日記作成
      </Button>
      <div className="p-8 flex flex-wrap gap-4">
        {props.diaries.map((diary) => (
          <div
            key={diary.id}
            className="w-320px border border-gray-600 rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-2">{diary.title}</h3>
            <p className="mb-2">{diary.content}</p>
            <p>{diary.createdAt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
