//api request
const url = "https://api.thecatapi.com/v1/breeds";
const url2 = "https://api.thecatapi.com/v1/images/search";
const api_key = "live_PHfEC3Cp34pwsAAJ0IyMyXuHXot2nnTHdPnU1pS5sIVmNGcdIsXYiNzxxJJWRrsI";


export const fetchBreeds = () => {
    return fetch (url,{headers: {
        'x-api-key': api_key
      }})
      .then(
        (response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      );
};

export const fetchCatByBreed = (breedId) => {
    return fetch (`${url2}?breed_ids=${breedId}`,{headers: {
        'x-api-key': api_key
      }})
      .then(
        (response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      );
};

 