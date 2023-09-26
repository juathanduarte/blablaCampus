import { CollegeSpot } from "./CollegeSpot"
import { User } from "./User"

interface CarpoolTeste{
  origin_campus: CollegeSpot
  origin_campus_name: string
  destination_campus: CollegeSpot
  destination_campus_name: string
  departure_date: string
  driver: User
  driver_registration: string
  vehicle: string
  vehicle_plate: string
  passengers: string
  available_seats: string
  reviews: string
  created_at: string
  updated_at: string
}