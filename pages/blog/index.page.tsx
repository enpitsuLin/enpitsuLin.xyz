export const Page: React.FC = (props) => {
  return (
    <>
      <h1>Welcome</h1>
      <pre className="break-words whitespace-pre-line">{JSON.stringify(props, null, 2)}</pre>
    </>
  );
};
