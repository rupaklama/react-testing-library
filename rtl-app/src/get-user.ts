// The goal here is to create an 'interface' that's going to
// describe all the different 'props' we expect to pass into our App component.
export interface UserProps {
  // structure of our props
  // '?' rite next to key to make it optional property
  // so we can show our App either with or without - color prop
  id: string; // by default, prop is required
  name: string;
}

// fetching a user from mock api
export function getUser(): Promise<UserProps> {
  return Promise.resolve({ id: '1', name: 'Rupak' });
}
