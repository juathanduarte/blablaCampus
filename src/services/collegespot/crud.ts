import { CollegeSpot } from '../../types/CollegeSpot';
import { EditCollegeSpot } from '../../types/EditCollegeSpot';
import { api } from '../api';

export async function registerCollegeSpot(collegeSpot: CollegeSpot) {
  const JSONCollegeSpot = JSON.stringify({
    name: collegeSpot.name,
    cep: collegeSpot.cep,
    state: collegeSpot.state,
    city: collegeSpot.city,
    neighborhood: collegeSpot.neighborhood,
    street: collegeSpot.street,
    number: collegeSpot.number,
    complement: collegeSpot.complement,
  });

  const { data } = await api.post<CollegeSpot>('/collegeSpot', JSONCollegeSpot, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
}

export async function isNameAvailable(name: string) {
  const JSONName = JSON.stringify({
    name: name,
  });

  const { data } = await api.post<boolean>('/collegeSpot/is-name-available', JSONName, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
}

export async function editCollegeSpot(collegeSpot: EditCollegeSpot) {
  const JSONEditCollegeSpot = JSON.stringify({
    name: collegeSpot.name,
    newName: collegeSpot.newName,
    cep: collegeSpot.cep,
    state: collegeSpot.state,
    city: collegeSpot.city,
    neighborhood: collegeSpot.neighborhood,
    street: collegeSpot.street,
    number: collegeSpot.number,
    complement: collegeSpot.complement,
  });

  const { data } = await api.put<CollegeSpot>('/collegeSpot', JSONEditCollegeSpot, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
}

export async function getCollegeSpot() {
  const { data } = await api.get<CollegeSpot>('/collegeSpot');

  return data;
}

export async function deleteCollegeSpot(name: string) {
  const JSONCollegeSpot = JSON.stringify({
    name: name,
  });

  const { data } = await api.post('/collegeSpot', JSONCollegeSpot, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
}
