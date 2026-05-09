export interface Product {
  id: string
  name: string
  type: string
  oxidization: string
  dotColor: string
  description: string
  price: number
  weight: string
  image: string
}

export interface SeasonTea {
  name: string
  price: number
}

export interface Season {
  id: string
  name: string
  months: string
  icon: string
  color: string
  hoverColor: string
  textColor: string
  description: string
  teas: SeasonTea[]
}

export interface FermentationType {
  id: string
  name: string
  oxidization: string
  gradientFrom: string
  gradientTo: string
  teaName: string
  price: number
  weight: string
  delay: number
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  popular: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  initials: string
  quote: string
  avatarBg: string
  avatarText: string
}

export interface ToastMessage {
  id: string
  message: string
  icon: string
}
