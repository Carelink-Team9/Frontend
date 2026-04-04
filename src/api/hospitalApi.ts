import axios from 'axios';
import type { ApiResponse, Hospital } from '../types/hospital';

export async function fetchNearbyHospitals(
  lat: number,
  lng: number,
  radius = 5.0,
  limit = 20,
  department?: string,
): Promise<Hospital[]> {
  const { data } = await axios.get<ApiResponse<Hospital[]>>('/api/hospitals/nearby', {
    params: { lat, lng, radius, limit, ...(department ? { department } : {}) },
  });
  return data.data;
}
