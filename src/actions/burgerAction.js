
export function FetchBurgers(restid) {
  return fetch(`http://localhost:3000/api/v1/restaurants/${restid}/burgers`).then(
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
  return fetch(`http://localhost:3000/api/v1/restaurants/${restid}/burgers`, request).then(
    (response) => response.json()
  );
}


