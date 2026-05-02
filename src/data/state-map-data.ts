export interface StateData {
  name: string
  abbr: string
  turnout2024: number
  turnout2019: number
  turnout2014: number
  seats: number
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast' | 'ut'
}

export const stateMapData: StateData[] = [
  { name: 'Andhra Pradesh', abbr: 'AP', turnout2024: 81.9, turnout2019: 79.7, turnout2014: 74.6, seats: 25, region: 'south' },
  { name: 'Arunachal Pradesh', abbr: 'AR', turnout2024: 75.3, turnout2019: 83.7, turnout2014: 70.5, seats: 2, region: 'northeast' },
  { name: 'Assam', abbr: 'AS', turnout2024: 77.5, turnout2019: 82.7, turnout2014: 80.0, seats: 14, region: 'northeast' },
  { name: 'Bihar', abbr: 'BR', turnout2024: 57.3, turnout2019: 57.3, turnout2014: 56.3, seats: 40, region: 'east' },
  { name: 'Chhattisgarh', abbr: 'CG', turnout2024: 70.8, turnout2019: 70.7, turnout2014: 61.9, seats: 11, region: 'central' },
  { name: 'Goa', abbr: 'GA', turnout2024: 71.5, turnout2019: 73.0, turnout2014: 77.3, seats: 2, region: 'west' },
  { name: 'Gujarat', abbr: 'GJ', turnout2024: 59.8, turnout2019: 63.4, turnout2014: 63.7, seats: 26, region: 'west' },
  { name: 'Haryana', abbr: 'HR', turnout2024: 64.0, turnout2019: 71.3, turnout2014: 71.4, seats: 10, region: 'north' },
  { name: 'Himachal Pradesh', abbr: 'HP', turnout2024: 69.5, turnout2019: 72.4, turnout2014: 65.2, seats: 4, region: 'north' },
  { name: 'Jharkhand', abbr: 'JH', turnout2024: 64.9, turnout2019: 65.3, turnout2014: 63.4, seats: 14, region: 'east' },
  { name: 'Karnataka', abbr: 'KA', turnout2024: 69.2, turnout2019: 69.7, turnout2014: 67.2, seats: 28, region: 'south' },
  { name: 'Kerala', abbr: 'KL', turnout2024: 71.3, turnout2019: 77.7, turnout2014: 73.8, seats: 20, region: 'south' },
  { name: 'Madhya Pradesh', abbr: 'MP', turnout2024: 66.0, turnout2019: 72.7, turnout2014: 61.6, seats: 29, region: 'central' },
  { name: 'Maharashtra', abbr: 'MH', turnout2024: 61.3, turnout2019: 61.4, turnout2014: 60.3, seats: 48, region: 'west' },
  { name: 'Manipur', abbr: 'MN', turnout2024: 84.0, turnout2019: 82.7, turnout2014: 78.2, seats: 2, region: 'northeast' },
  { name: 'Meghalaya', abbr: 'ML', turnout2024: 67.2, turnout2019: 67.0, turnout2014: 68.6, seats: 2, region: 'northeast' },
  { name: 'Mizoram', abbr: 'MZ', turnout2024: 59.8, turnout2019: 63.4, turnout2014: 62.1, seats: 1, region: 'northeast' },
  { name: 'Nagaland', abbr: 'NL', turnout2024: 79.4, turnout2019: 83.2, turnout2014: 87.8, seats: 1, region: 'northeast' },
  { name: 'Odisha', abbr: 'OD', turnout2024: 74.4, turnout2019: 73.1, turnout2014: 73.7, seats: 21, region: 'east' },
  { name: 'Punjab', abbr: 'PB', turnout2024: 62.8, turnout2019: 65.9, turnout2014: 70.6, seats: 13, region: 'north' },
  { name: 'Rajasthan', abbr: 'RJ', turnout2024: 59.1, turnout2019: 64.3, turnout2014: 63.1, seats: 25, region: 'north' },
  { name: 'Sikkim', abbr: 'SK', turnout2024: 80.3, turnout2019: 81.4, turnout2014: 83.6, seats: 1, region: 'northeast' },
  { name: 'Tamil Nadu', abbr: 'TN', turnout2024: 69.7, turnout2019: 72.5, turnout2014: 73.7, seats: 39, region: 'south' },
  { name: 'Telangana', abbr: 'TS', turnout2024: 64.9, turnout2019: 62.7, turnout2014: 62.3, seats: 17, region: 'south' },
  { name: 'Tripura', abbr: 'TR', turnout2024: 81.4, turnout2019: 82.7, turnout2014: 84.8, seats: 2, region: 'northeast' },
  { name: 'Uttar Pradesh', abbr: 'UP', turnout2024: 56.9, turnout2019: 59.2, turnout2014: 58.4, seats: 80, region: 'central' },
  { name: 'Uttarakhand', abbr: 'UK', turnout2024: 55.5, turnout2019: 61.5, turnout2014: 57.2, seats: 5, region: 'north' },
  { name: 'West Bengal', abbr: 'WB', turnout2024: 73.5, turnout2019: 81.4, turnout2014: 82.2, seats: 42, region: 'east' },
  { name: 'Delhi', abbr: 'DL', turnout2024: 58.7, turnout2019: 60.6, turnout2014: 65.2, seats: 7, region: 'ut' },
  { name: 'J&K', abbr: 'JK', turnout2024: 58.5, turnout2019: 44.3, turnout2014: 49.5, seats: 5, region: 'north' },
  { name: 'Lakshadweep', abbr: 'LD', turnout2024: 85.2, turnout2019: 84.8, turnout2014: 86.3, seats: 1, region: 'ut' },
  { name: 'Puducherry', abbr: 'PY', turnout2024: 79.8, turnout2019: 80.8, turnout2014: 81.5, seats: 1, region: 'ut' },
]

export const regionColors: Record<string, string> = {
  north: 'hsl(27, 100%, 60%)',
  south: 'hsl(145, 81%, 35%)',
  east: 'hsl(215, 51%, 50%)',
  west: 'hsl(263, 70%, 50%)',
  central: 'hsl(51, 100%, 50%)',
  northeast: 'hsl(340, 82%, 55%)',
  ut: 'hsl(180, 60%, 45%)',
}
