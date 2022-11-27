import axios from 'axios';

// API 양식 수정 필요
/*
.then((response) => {
  const nicknameIsUnique = response.data.nickname_is_unique;
  if (nicknameIsUnique) {
    setNicknameMsgObj({ code: 110, arg1: '별명' });
  } else {
    setNicknameMsgObj({ code: 105, arg1: '별명' });
  }
});
*/

const getNicknameDuplicate = async (nickname) => {
  try {
    const { data } = await axios
      .get(`${process.env.REACT_APP_MOCKSERVER_URL}/api/v1/nicknames/duplicate/${nickname}`);
    return data;
  } catch (e) {
    return -1;
  }
};

/*
const checkEmailDuplicate = (email) => {
  axios
    .get(`${process.env.REACT_APP_MOCKSERVER_URL}/api/v1/emails/duplicate/${email}`)
    .then((response) => {
      const emailIsUnique = response.data.email_is_unique;
      if (emailIsUnique) {
        setEmailMsgObj({ code: 110, arg1: '이메일' });
      } else {
        setEmailMsgObj({ code: 105, arg1: '이메일' });
      }
    });
};
*/

const getEmailDuplicate = async (email) => {
  try {
    const { data } = await axios
      .get(`${process.env.REACT_APP_MOCKSERVER_URL}/api/v1/emails/duplicate/${email}`);
    return data;
  } catch (e) {
    return -1;
  }
};

export { getNicknameDuplicate, getEmailDuplicate };
