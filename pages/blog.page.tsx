export const Page: React.FC = (props) => {
  return (
    <div>
      Blog
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
