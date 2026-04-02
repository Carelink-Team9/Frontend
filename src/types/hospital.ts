export interface Hospital {
  hospitalId: number;
  name: string;
  address: string;
  department: string;
  phone: string;
  latitude: number;
  longitude: number;
  sidoNm: string;
  sgguNm: string;
  homepage: string | null;
  distanceKm: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}
