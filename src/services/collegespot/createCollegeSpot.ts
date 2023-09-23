import { CollegeSpotSchema } from '../../schemas/collegeSpot';
import { api } from '../api';

export async function createCollegeSpot(collegeSpot: CollegeSpotSchema) {
  const { data } = await api.post('/collegeSpot', collegeSpot);
  return data;
}

export async function isNameAvailable(name: string): Promise<{ exists: boolean }> {
  const { data } = await api.post('/collegeSpot/is-name-available', { name });
  return { exists: Boolean(data?.exists) };
}

interface GetSpotInfoByCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function getSpotInfoByCEP(cep: string) {
  const { data } = await api.get<GetSpotInfoByCEPResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  console.log({ data });
  return data;
}
