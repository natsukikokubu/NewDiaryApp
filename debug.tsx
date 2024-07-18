import { Server } from "http";
import { getApiBaseUrl } from "./utils/getApiBaseUrl";
import { GetServerSideProps } from "next";

type ServerProps = {
  name: string;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const data = await fetch(`getApiBaseUrl(req)}/hello`).then((data) =>
    data.json()
  );
  return {
    props: data,
  };
};

type Props = ServerProps;

export default function Debug(props: Props) {
  return (
    <main>
      <h1>This is debug page</h1>
      <span>My name is {props.name}</span>
    </main>
  );
}
