

export const  pullTweetsFormTwitter = (token) =>{
    const url =`https://twitapp359-service.herokuapp.com/get/tweets`;
    return (dispatch) => fetch(
        url,
        {
            headers: {
                'jwt-token':token
            },
            method: 'get'
        })
        .then(res =>{
                if (res.ok && res.status === 200) {
                  return res.json();
                } else {
                  throw new Error(res.statusText || 'Please enter valid credentials');
                }
        })
        .catch(err => {
                return err ;
        });
}