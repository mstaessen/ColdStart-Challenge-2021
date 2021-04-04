async function getUserInfo() {
  if (window.location.hostname === 'localhost') {
    return {
      clientPrincipal: {
        identityProvider: 'github',
        userId: 'some-random-guid',
        userDetails: 'local-user',
        userRoles: [
          'reader',
          'anonymous',
          'authenticated',
        ],
      },
    };
  }

  try {
    console.log('getUserInfo');
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    console.log(clientPrincipal);
    return clientPrincipal;
  } catch (error) {
    console.error('No profile could be found');
    return undefined;
  }
}

export { getUserInfo as default };
