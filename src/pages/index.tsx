import { initInitData, initMiniApp } from "@telegram-apps/sdk";

import { colors } from "@/styles";

const App: FC = () => {
  const [miniApp] = initMiniApp() ?? [];
  const { startParam, user } = initInitData() ?? {};

  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffectOnce(() => {
    i18n.changeLanguage(user?.languageCode?.substring(0, 2));

    miniApp?.setHeaderColor(colors.primary);

    navigate(`/${!startParam ? "person" : "group"}`, { replace: !0 });
  });

  return <Outlet />;
};

export default App;
