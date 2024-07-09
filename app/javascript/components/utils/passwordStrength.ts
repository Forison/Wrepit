import { Strength } from "../interface"

const hasNumber = (character: string): boolean => new RegExp(/[0-9]/).test(character)

const hasMixed = (character: string): boolean => new RegExp(/[a-z]/).test(character) && new RegExp(/[A-Z]/).test(character)

const hasSpecial = (character: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(character)

export const strengthColor = (count: number): Strength => {
  if (count < 2) return { label: 'Poor', color: 'error.main' }
  if (count < 3) return { label: 'Weak', color: 'warning.main' }
  if (count < 4) return { label: 'Normal', color: 'warning.dark' }
  if (count < 5) return { label: 'Good', color: 'success.main' }
  if (count < 6) return { label: 'Strong', color: 'success.dark' }
  return { label: 'Poor', color: 'error.main' }
}

export const strengthIndicator = (character: string): number => {
  let strengths = 0
  if (character.length > 5) strengths += 1
  if (character.length > 7) strengths += 1
  if (hasNumber(character)) strengths += 1
  if (hasSpecial(character)) strengths += 1
  if (hasMixed(character)) strengths += 1
  return strengths
}
