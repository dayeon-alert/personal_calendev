import { useState } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import '@toast-ui/editor/dist/toastui-editor.css';
import ChevronRight from '@mui/icons-material/ChevronRight';
import 'dayjs/locale/ko';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr'; // 한국어?
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { CommonTextField, CommonStack } from '../../components';

/*
1. editor 관련 props는 아래 링크를 확인
https://nhn.github.io/tui.editor/latest/ToastUIEditorCore
todos
1. validation => me
2. style 정리
3. handlesubmit event 완성 => me
4. dropdown으로 되어 있는 tag를 원래 고려형태로 변경...
5. 썸네일 추후 적용
*/

function EditPost() {
  const [value, setValue] = useState(dayjs('2022-04-07'));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // form을 통해서 정상적으로 값이 받아지는지 테스팅
    console.log(data.get('postTitle'));
    // console.log(data.get('postStartDttm'));
    // console.log(data.get('postEndDttm'));
    console.log(data.get('postPhoneNumber'));
    console.log(data.get('postEmail'));
    console.log(data.get('postAddress'));
    console.log(data.get('postTags'));
  };

  // component main은 무엇인가?
  // customInput을 어떻게든 해결해야 한다.
  return (
    <StyledCommonStack>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        행사등록
      </Typography>
      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <StyledCustomTextField
          placeholder="제목"
          helperText="10/70자"
          name="postTitle"
        />
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DateTimePicker
              value={value}
              onChange={handleChange}
              renderInput={(params) => <CommonTextField {...params} />}
              ampm={false}
            />
            <ChevronRight fontSize="small" />
            <DateTimePicker
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <CommonTextField {...params} placeholder="" />
              )}
              ampm={false}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" spacing={1}>
          <CommonTextField name="postPhoneNumber" placeholder="연락처" />
          <CommonTextField name="postEmail" placeholder="이메일" />
        </Stack>
        <StyledCustomTextField
          placeholder="장소"
          name="postAddress"
          helperText="0/150자"
        />
        <CommonEditorStack>
          <Editor
            initialEditType="wysiwyg" // 기본 에디터 설정 prop
            placeholder="행사 소개글을 입력해주세요."
            initialValue=" " // 기본 값. (이걸 빼면, write preview라는 이상한 글씨가 들어가서 넣었음.)
            usageStatistics={false} // 구글 아날리틱스 안씀.
            height="450px"
            language="ko-KR" // 기본이 영어라 한국어로 변경
            toolbarItems={[
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task'],
              ['table', 'image', 'link'],
              ['code', 'codeblock'],
            ]}
          />
        </CommonEditorStack>
      </Stack>
    </StyledCommonStack>
  );
}
export default EditPost;

const StyledCommonStack = styled(CommonStack)`
  & > * {
    :not(:last-child) {
      margin-bottom: ${(props) => props.theme.spacing(4)};
    }
  }
`;

const StyledCustomTextField = styled(CommonTextField)`
  & > p {
    text-align: right;
  }
`;

const CommonEditorStack = styled(Stack)`
  &
    > *
    > .toastui-editor-defaultUI
    > .toastui-editor-toolbar
    > .toastui-editor-defaultUI-toolbar {
    flex-wrap: wrap;
    & .toastui-editor-dropdown-toolbar {
      flex-wrap: wrap;
      height: auto;
    }
  }
`;

/*
const CalendarTextField = styled(TextField)`
  & .MuiInputBase-input {
    padding: ${(props) => props.theme.spacing(0.5, 2)};
    font-size: 0.9rem;
  }
  & .MuiFormHelperText-root {
    margin-left: 7px;
    margin-right: 0;
  }
`;
*/
