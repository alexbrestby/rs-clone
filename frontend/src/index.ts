const usersRequest = async () => {
  // const baseURL = `http://localhost:3000/users`;
  const baseURL = `https://mozgotren-clone-api.onrender.com/users`;
  try {
    const response = await fetch(baseURL, {
      method: 'GET',
    })
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  const users = await usersRequest()
  const usersHeader = document.createElement('h2');
  usersHeader.innerHTML = 'Users List';
  const userList = document.createElement('ul');
  for (let i = 0; i < users.length; i += 1) {
    const user = document.createElement('li') as HTMLElement;
    user.innerHTML = (
      `userID: ${users[i]._id} ***
       userName: ${users[i].username} ***
       userEmail: ${users[i].email}`
    ) as string;
    user.style.marginBottom = '10px';
    userList.append(user);
  }
  document.querySelector('body')?.append(usersHeader, userList);
})()



export default usersRequest;
