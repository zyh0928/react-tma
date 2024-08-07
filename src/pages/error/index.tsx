interface NotFoundProps {
  code?: number;
}

const NotFound: FC<NotFoundProps> = ({ code = 404 }) => (
  <img
    src={`https://http.cat/${code}`}
    style={{ display: "block", width: "100%" }}
  />
);

export default NotFound;
