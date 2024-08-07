import { initInitData } from "@telegram-apps/sdk";

import { getGroupUsers } from "$/group";

const Group: FC = () => {
  const { startParam } = initInitData() ?? {};

  const [data, setData] = useState({});

  useEffectOnce(() => {
    getGroupUsers(startParam).then(setData);
  });

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Group;
