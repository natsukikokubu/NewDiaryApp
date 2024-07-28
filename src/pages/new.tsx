import { Button } from "./button";
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
    <main>
      <h1>Diary App</h1>
      <h2>日記を追加</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="content">日付け</label>
          <input type="date" name="date" />
        </div>
        <div>
          <label htmlFor="content">日記</label>
          <textarea name="content" />
        </div>

        <Button size="medium" type="submit">
          保存
        </Button>
        {hasError && <p>入力に誤りがあります</p>}
      </form>
    </main>
  );
}
