export const Page: React.FC<any> = (props) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </div>
  );
};
