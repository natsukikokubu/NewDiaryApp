import { Button } from "../components/button";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function New() {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const date = form.get("date") as string;

    if (!title || !content) {
      setHasError(true);
      return;
    }

    setHasError(false);

    await fetch("/api/diaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <main className="text-gray-700">
      <h1 className="text-5xl font-bold my-4 ">Diary App</h1>
      <h2 className="text-4xl font-semibold my-4">日記を追加</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-lg font-bold mb-2" htmlFor="title">
            タイトル
          </label>
          <input
            className="border border-gray-400 rounded-lg p-4 my-4"
            type="text"
            name="title"
          />
        </div>
        <div>
          <label className="text-lg font-bold mb-2" htmlFor="content">
            日付け
          </label>
          <input
            className="border border-gray-400 rounded-lg p-4 my-4"
            type="date"
            name="date"
          />
        </div>
        <div className="mb-6">
          <label className="text-lg font-bold mb-2" htmlFor="content">
            日記
          </label>
          <textarea
            className="border border-gray-400 rounded-lg p-4 my-4"
            name="content"
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
