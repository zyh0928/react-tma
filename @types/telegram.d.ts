export {};

declare global {
  type TGGroupUser = Partial<{
    first_name: string;
    id: number;
    is_bot: boolean;
    language_code: string;
    last_name: string;
    username: string;
  }>;
}
