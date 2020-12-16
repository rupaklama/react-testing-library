import React, { useEffect, useState } from 'react';
import  { getUser, UserProps } from './get-user';
import './App.css';


function App() {
  const [text, setText] = useState('');
  // initial value cn be UserProps or null, null to start with
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <div className='App'>
      <h1>React Testing Library</h1>
      {user ? <p>Username: {user.name}</p> : null}

      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text ? text : '...'}</p>
    </div>
  );
}

interface CustomInputProps {
  children: React.ReactNode;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function CustomInput({ children, value, onChange }: CustomInputProps) {
  return (
    <div>
      <label htmlFor='text'>{children}</label>
      <input
        type='text'
        placeholder='enter text'
        id='text'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
