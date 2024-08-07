import { initInitData } from "@telegram-apps/sdk";

const App: FC = () => {
  const { chatType, user } = initInitData() ?? {};

  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffectOnce(() => {
    i18n.changeLanguage(user?.languageCode?.substring(0, 2));

    const isGroup = chatType?.includes("group");

    navigate(`/${isGroup ? "group" : "person"}`, { replace: !0 });
  });

  return <Outlet />;
};

export default App;
