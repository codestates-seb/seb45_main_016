import axios from 'axios';

export const Post = async (url) => {
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: localStorage.getItem('Token'),
          dataType: 'json',
        },
      },
    );
    console.log(response.data);

    return response;
  } catch (e) {
    console.log(e);
  }
};
