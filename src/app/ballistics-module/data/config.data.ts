export let CONFIG: any = {
    apiUrl: 'Not Implemented',
    authProvider: {
        name: 'AzureAD',
        adminUrl: 'https://manage.windowsazure.com/Pulte.onmicrosoft.com',
        authUrl: 'https://login.windows.net/1a9277a3-ef66-41f6-96b5-c5390ee468a7/oauth2/authorize',
        clientId: 'Not Implemented',
        redirectUrl:  window.location.origin + '/tokenResponse.html',
        return_type: 'id_token'
    }
};
