interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercise = (hours: Array<number>, target: number): Result => {
    let sum = 0;
    for (const value of hours) {
        sum += value;
    }
    const average = sum / hours.length
    let rating = null
    let explanation = null
    if (average > target) {
        rating = 3
        explanation = "good"
    } else if (average === target) {
        rating = 2
        explanation = "ok"
    } else {
        rating = 1
        explanation = "could be better"
    }

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(a => a != 0).length,
        success: average > target,
        rating: rating,
        ratingDescription: explanation,
        target: target,
        average: average
    }
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))