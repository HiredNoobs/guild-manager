export const fetchDiscordMembers = async () => {
  const response = await fetch(`/api/discord/members`);
  const data = await response.json();

  if (response.status !== 200) {
    throw data;
  }

  return data;
};

export const kickDiscordMember = async (memberId) => {
  const response = await fetch(`/api/discord/members/${memberId}`, { method: "DELETE" });
  return response.status === 204;
}

export const fetchGW2Members = async () => {
  const response = await fetch(`/api/gw2/members`);
  const data = await response.json();

  if (response.status !== 200) {
    throw data;
  }

  return data;
};

export const fetchGW2Log = async () => {
  const response = await fetch(`/api/gw2/log`);
  const data = await response.json();

  if (response.status !== 200) {
    throw data;
  }

  return data;
};

export default {
  fetchDiscordMembers: fetchDiscordMembers,
  kickDiscordMember: kickDiscordMember,
  fetchGW2Members: fetchGW2Members,
  fetchGW2Log: fetchGW2Log,
};
