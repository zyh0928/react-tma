import ky from "ky";

interface ChatResponse {
  ok: boolean;
  result: {
    user: TGGroupUser;
  }[];
}

const BOT_TOKEN = import.meta.env.TMA_TOKEN;

export const getGroupUsers = async (chatId?: string) => {
  if (!chatId) {
    return [];
  }

  const json: ChatResponse = await ky
    .post(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatAdministrators?chat_id=${chatId}`,
    )
    .json();

  if (!json.ok) {
    return [];
  }

  return json.result
    .filter((item) => !item.user.is_bot)
    .map((item) => item.user);
};
