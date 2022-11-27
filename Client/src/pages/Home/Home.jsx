import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { CommonPaper } from '../../components';

function Home() {
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    navigate(`/${event.target.name}`);
  };

  return (
    <StyledPaper>
      <Button onClick={onClickHandler} name="signin" variant="contained">
        로그인
      </Button>
      <Button onClick={onClickHandler} name="signup" variant="contained">
        회원가입
      </Button>
      <Button onClick={onClickHandler} name="writepost" variant="contained">
        글작성
      </Button>
    </StyledPaper>
  );
}

export default Home;

const StyledPaper = styled(CommonPaper)`
  & > * {
    :not(:last-child) {
      margin-bottom: ${(props) => props.theme.spacing(4)};
    }
  }
`;
