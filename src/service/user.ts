import sleep from "@/utils/sleep";

export const getRoutes = async (): Promise<MenuType[]> => {
  await sleep(1000);

  const base: MenuType[] = [
    {
      icon: "flower-poppy",
      id: 1,
      label: {
        en: "Allah Akbar!",
        zh: "家！",
      },
      path: "person/index",
      route: "person",
    },
    {
      icon: "weather-dust",
      id: 2,
      label: {
        en: "Homie~",
        zh: "宝库~",
      },
      path: "group/index",
      route: "group",
    },
  ];

  return base;
};
