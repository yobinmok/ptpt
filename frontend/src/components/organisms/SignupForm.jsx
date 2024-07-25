import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import InputGroup from '../molecules/InputGroup';
import Button from '../atoms/Button';

const SignupForm = () => {
  const { signup } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    department: '',
    position: '',
    name: '',
    userId: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('aa');
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      console.log('bb');
      setFormErrors(errors);
    } else {
      signup(formData);
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.department) errors.department = '소속을 입력하세요.';
    if (!data.position) errors.position = '직책을 입력하세요.';
    if (!data.name) errors.name = '이름을 입력하세요.';
    if (!data.userId) errors.userId = '아이디를 입력하세요.';
    if (!data.password) {
      errors.password = '비밀번호를 입력하세요.';
    } else if (data.password.length < 9 || data.password.length > 16) {
      errors.password = '비밀번호는 9자 이상 16자 이하이어야 합니다.';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    return errors;
  };

  const fields = [
    { label: '소속', type: 'text', name: 'department' },
    { label: '직책', type: 'text', name: 'position' },
    { label: '이름', type: 'text', name: 'name' },
    { label: '아이디', type: 'text', name: 'userId' },
    { label: '비밀번호', type: 'password', name: 'password' },
    { label: '비밀번호 확인', type: 'password', name: 'confirmPassword' },
  ];

  return (
    <div className='signup-form'>
      <h1 className='signup-title'>회원가입</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputGroup
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            error={formErrors[field.name]}
          />
        ))}
        <Button type='submit' className='btn btn--form'>
          가입하기
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
