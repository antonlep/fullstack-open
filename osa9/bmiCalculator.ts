const calculateBmi = (height: number, weight: number): string => {
    const res = weight / ((height / 100) ** 2)
    if (res < 16) {
        return 'Underweight (Severe thinness)'
    } else if (res < 17) {
        return 'Underweight (Moderate thinness)'
    } else if (res < 18.5) {
        return 'Underweight (Mild thinness)'
    } else if (res < 25) {
        return 'Normal range'
    } else if (res < 30) {
        return 'Overweight (Pre-obese)'
    } else if (res < 35) {
        return 'Obese (Class I)'
    } else if (res < 40) {
        return 'Obese (Class II)'
    } else {
        return 'Obese (Class II)'
    }
}

console.log(calculateBmi(180, 58))