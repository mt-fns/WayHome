const users = [];

// Join user to chat
export function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}
