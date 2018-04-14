import { Linking } from 'react-native'; // eslint-disable-line import/no-unresolved, max-len

let previousOnLinkChange;

export const dance = (authUrl, navigator, cancel) => {
  if (previousOnLinkChange) {
    Linking.removeEventListener('url', previousOnLinkChange);
  }
  console.log('url', authUrl);

  // return Promise.resolve('hello world');
  // return Promise.resolve("");
  const completePromise = new Promise((resolve, reject) => {
    console.log('insider');
    const handleUrl = (url) => {
      if (!url || url.indexOf('fail') > -1) {
        reject(url);
      } else {
        resolve(url);
      }
    };

    const onLinkChange = ({ url }) => {
      Linking.removeEventListener('url', onLinkChange);
      previousOnLinkChange = undefined;
      handleUrl(url);
    };

    Linking.addEventListener('url', onLinkChange);

    previousOnLinkChange = onLinkChange;
  });

  if (navigator) {
    navigator.push({
      screen: "shared.WebviewPage",
      passProps: {
        hasHeader: cancel,
        leftOnPress: () => navigator.pop(),
        url: authUrl
      },
      navigatorStyle: {
        navBarHidden: true
      }
    });
    return completePromise;
  } else {
    return Linking.openURL(authUrl)
      .then(() => completePromise);
  }

};

export const request = fetch;
