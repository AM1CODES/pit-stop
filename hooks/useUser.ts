import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/user/actions';

export default function useUser() {
  const dispatch = useDispatch();

  const fetchUser = useCallback(async (address: string) => {
    const authData = await fetch(`/api/user?address=${address}`);
    const user = await authData.json();
    console.log(user);
    // @ts-ignore
    dispatch(getUser(user.user));
  }, []);

  const changeProfilePhoto = useCallback(
    async (address: string, url: string) => {
      const authData = await fetch(
        `/api/profile?address=${address}&url=${url}`
      );
      const user = await authData.json();
      console.log(user);
      // @ts-ignore
      dispatch(getUser(user.user));
    },
    []
  );

  const changeUsername = useCallback(
    async (address: string, username: string) => {
      const authData = await fetch(
        `/api/profile?address=${address}&username=${username}`
      );
      const user = await authData.json();
      console.log(user);
      // @ts-ignore
      dispatch(getUser(user.user));
    },
    []
  );

  return {
    fetchUser,
    changeProfilePhoto,
    changeUsername
  };
}
