import { api } from '../api';

export async function getRides({ origin, destination }: { origin: string; destination: string }) {
  const params = {
    origin,
    destination,
  };

  // encode to urlparms
  const urlParams = new URLSearchParams(params);
  console.log(urlParams.toString());

  const { data } = await api.get(`/carpool?${urlParams.toString()}`);
  console.log(data);

  return params;
}
