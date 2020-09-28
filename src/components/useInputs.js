import { useCallback, useState } from 'react';

export default function useInputs(initialForm) {
  const [inputs, setInputs] = useState({
    inputCategoryName: '',
    inputContent: '',
    inputExpense: '',
  });

  const { inputCategoryName, inputContent, inputExpense } = inputs;

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  // 생성 입력창 유효성 검사 함수
  const validateInputs = () => {
    if (inputCategoryName === '') {
      alert('카테고리를 입력해주세요');
      return false;
    }

    if (inputContent === '') {
      alert('내용을 입력해주세요');
      return false;
    }

    const regex = /^[0-9]+$/;
    if (!regex.test(inputExpense)) {
      alert('지출 비용에 숫자를 입력해주세요');
      return false;
    }

    return true;
  };

  return [inputs, setInputs, onChange, validateInputs];
}
