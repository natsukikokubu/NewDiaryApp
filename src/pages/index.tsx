import { getApiBaseUrl } from "../../utils/getApiBaseUrl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Diary } from "../../types/diary";

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
  return (
    console.log(props),
    (
      <main>
        <h1 className="text-5xl font-bold">diary App</h1>
        <h2 className="text-4xl font-semibold">日記一覧</h2>
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
    )
  );
}
