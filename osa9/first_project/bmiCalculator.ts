interface Sizes {
    height: number
    weight: number
}

const parseArguments = (args: Array<string>): Sizes => {
    if (args.length < 4) throw new Error('Too few arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Not numbers');
    }
};

const calculateBmi = (height: number, weight: number): string => {
    const res = weight / ((height / 100) ** 2);
    if (res < 16) {
        return 'Underweight (Severe thinness)';
    } else if (res < 17) {
        return 'Underweight (Moderate thinness)';
    } else if (res < 18.5) {
        return 'Underweight (Mild thinness)';
    } else if (res < 25) {
        return 'Normal range';
    } else if (res < 30) {
        return 'Overweight (Pre-obese)';
    } else if (res < 35) {
        return 'Obese (Class I)';
    } else if (res < 40) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class II)';
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi };