interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface Parsed {
    hours: Array<number>
    target: number
}

const parseArgumentsExercise = (args: Array<string>): Parsed => {
    if (args.length < 4) throw new Error('Too few arguments');
    const input = args.slice(2);
    const res = [];
    for (const value of input) {
        if (isNaN(Number(value))) throw new Error('Not all numbers');
        res.push(Number(value));
    }
    return {
        hours: res.slice(1),
        target: res[0]
    };
};

const calculateExercise = (hours: Array<number>, target: number): Result => {
    let sum = 0;
    for (const value of hours) {
        sum += value;
    }
    const average = sum / hours.length;
    let rating = null;
    let explanation = null;
    if (average > target) {
        rating = 3;
        explanation = "good";
    } else if (average === target) {
        rating = 2;
        explanation = "ok";
    } else {
        rating = 1;
        explanation = "could be better";
    }

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(a => a != 0).length,
        success: average > target,
        rating: rating,
        ratingDescription: explanation,
        target: target,
        average: average
    };
};

try {
    const { hours, target } = parseArgumentsExercise(process.argv);
    console.log(calculateExercise(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateExercise };