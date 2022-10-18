export interface Address {
  address?: string
  roadAddress?: string
  latitude?: string
  longitude?: string
  memberLocalId?: String
}

export interface SaveAddress extends Address {
  memberLocalId: string
}

export interface Location {
  latitude: number
  longitude: number
}
