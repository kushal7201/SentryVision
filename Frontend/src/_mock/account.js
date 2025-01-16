export const fetchUserDetails = async () => {
  const token = localStorage.getItem('token');
  // console.log(`This is the toke: ${token}`)

  const formData = new FormData();
  formData.append('token', token);

  if (!token) {
    console.error('Token not found in local storage');
    return null;
  }

  try {
    const response = await fetch('https://sentryvision.onrender.com/user/profile', {
      method: 'POST',
      body: formData, // Directly pass the FormData object
    });
    if (!response.ok) {
      console.error('Failed to fetch user details:', response.statusText);
      return null;
    }
    const userData = await response.json();
    // const data = userData.payload[0]
    console.log(userData.payload[0].firstname)
    // firstname= data.firstname
    // localStorage.setItem('user', userData.username)
    // localStorage.setItem('mail', userData.email)
    return await userData;
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return null;
  }
};


const inData = {
  "payload":[{
    displayName: "",
    photoURL: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    email: ``,
    phone: ``,
    id: ""
  }]
}


const userdata = await fetchUserDetails()?await fetchUserDetails():inData
const data = userdata.payload[0]


// console.log(userdata)


// const inData = {
//   displayName: "",
//   photoURL: '',
//   email: ``,
//   branch: ``,
// }

export const account = {
  displayName: `${data.firstname} ${data.lastname}`,
  photoURL: `https://sentryvision.onrender.com/${data.avatar}`,
  email: `${data.email}`,
  phone: `${data.phone}`,
  id: `${data.id}`
};

console.log(account.photoURL)

// export const account = {
//   displayName: "",
//   photoURL: '',
//   email: ``,
//   branch: ``,
// };

// export const fetchDetails = async ()=>{
//   const userdata = await fetchUserDetails()
//   const data = userdata.payload[0]
//   account.displayName = `${data.firstname} ${data.lastname}`
//   account.photoURL = '/assets/images/avatars/avatar_25.jpg'
//   account.email = `${data.email}`
//   account.branch = `${data.phone}`
  
// }
// fetchDetails()