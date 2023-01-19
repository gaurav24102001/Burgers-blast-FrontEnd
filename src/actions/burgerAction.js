
export function FetchBurgers(restURL) {
  return fetch(`https://burgerblast-pern-production.up.railway.app/api/v1/restaurant/${restURL}/burgers`).then(
    (response) => response.json()
  );
}

 export function CreateBurger(burger, restid) {
  const request = {
    method: 'POST',
    body: JSON.stringify({
      burger: burger,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`https://burgerblast-pern-production.up.railway.app/api/v1/restaurants/${restid}/burgers`, request).then(
    (response) => response.json()
  );
}


