export interface Address {
  address?: string
  roadAddress?: string
  latlng?: {
    lat: number
    lng: number
  }
}

export interface Location {
  latitude: number
  longitude: number
}
