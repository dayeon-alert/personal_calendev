import Stack from '@mui/material/Stack';
import { styled } from '@mui/material';

const CommonStack = styled(Stack)`
  align-items: center;
  width: auto;
  padding: ${(props) => props.theme.spacing(1)};
  margin: ${(props) => props.theme.spacing(1)};
  ${(props) => props.theme.breakpoints.up('mobile')} {
    max-width: 1000px;
    margin: ${(props) => props.theme.spacing(1, 'auto')};
  }
`;

export default CommonStack;
