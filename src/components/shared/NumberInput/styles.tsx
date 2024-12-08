import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)({
  width: '140px',
  '& input': {
    fontFamily: 'var(--font-geist-sans)',
    fontSize: '16px'
  }
});
