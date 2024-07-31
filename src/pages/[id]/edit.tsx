import { Button } from "../components/button";
import { Diary } from "../../../types/diary";
import { getApiBaseUrl } from "../../../utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

type ServerProps = { diary: Diary };

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  query,
  req,
}) => {
  const id = query.id;
  const res = await fetch(`${getApiBaseUrl(req)}/diaries/${id}`).then((res) =>
    res.json()
  );
  console.log("----------------------------");
  console.log(res);
  return {
    props: { diary: res },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Edit({ diary }: Props) {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const date = form.get("date") as string;

    if (!title || !content || !date) {
      setHasError(true);
      return;
    }

    setHasError(false);

    await fetch(`/api/diaries/${router.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, date }),
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <main className="text-gray-700">
      <h1 className="text-5xl font-bold my-4 ">Diary App</h1>
      <h2 className="text-4xl font-semibold my-4">日記の編集</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-lg font-bold mb-2" htmlFor="title">
            タイトル
          </label>
          <input
            className="border border-gray-400 rounded-lg p-4 my-4"
            name="title"
            defaultValue={diary.title}
          />
        </div>
        <div>
          <label className="text-lg font-bold mb-2" htmlFor="content">
            日付け
          </label>
          <input
            className="border border-gray-400 rounded-lg p-4 my-4"
            name="date"
            defaultValue={diary.date}
          />
        </div>
        <div className="mb-6">
          <label className="text-lg font-bold mb-2" htmlFor="content">
            日記
          </label>
          <textarea
            className="border border-gray-400 rounded-lg p-4 my-4"
            name="content"
            defaultValue={diary.content}
          />
        </div>

        <Button size="medium" type="submit">
          保存
        </Button>
        {hasError && <p>入力に誤りがあります</p>}
      </form>
    </main>
  );
}
