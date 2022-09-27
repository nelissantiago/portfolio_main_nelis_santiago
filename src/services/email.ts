import axios from 'axios';

export const sendContactMail = async (
  name: string,
  senderMail: string,
  content: string
) => {
  const dataemail = {
    name,
    senderMail,
    content
  };

  try {
    return await axios.post('/services/contact', dataemail);
  } catch (error) {
    return error;
  }
};
