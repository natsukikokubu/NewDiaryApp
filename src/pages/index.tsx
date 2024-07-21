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
        <h1>diary App</h1>
      </main>
    )
  );
}
