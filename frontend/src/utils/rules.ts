export const rules = {
  required: (v: string) => !!v || 'Field required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'No valid email',
  number: (v: number) => !isNaN(v) || 'Must be a number',
  date: (v: string) => {
    if (!v) return true; // Kann leer sein
    return new Date(v) >= new Date() || 'Date must be in the future' // Muss in der zukunft liegen
  }
}