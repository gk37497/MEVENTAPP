import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organizerId, setOrganizerId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token').then(t => {
      t && setToken(t);
      AsyncStorage.getItem('organizerId')
        .then(o => {
          o && setOrganizerId(JSON.parse(o));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    });
  }, []);

  const login = async user => {
    console.log(user);
    await AsyncStorage.setItem('token', user.token)
      .then(() => {
        console.log('Token stored');
        setToken(user.token);
      })
      .catch(e => console.log(e));

    console.log(JSON.stringify(user.organizerId));
    if (JSON.stringify(user.organizerId)) {
      console.log('organizer di', user.organizarId);
      await AsyncStorage.setItem(
        'organizerId',
        JSON.stringify(user.organizerId),
      )
        .then(() => {
          console.log('organizer ID stored');
          setOrganizerId(user.organizerId);
        })
        .catch(e => console.log(e));
    } else {
      console.log('Not organizer');
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'organizerId'])
      .then(() => {
        console.log('data removed');
        setToken(null);
      })
      .catch(e => console.log(e));
  };

  const createOrganizer = async id => {
    await AsyncStorage.setItem('organizerId', JSON.stringify(id))
      .then(() => {
        setOrganizerId(id);
        console.log('organizer created');
      })
      .catch(() => console.error('error while creating organizer'));
  };

  const getToken = () => {
    let result = token ? `Bearer ${token}` : null;
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        getToken,
        loading,
        organizerId,
        createOrganizer,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
