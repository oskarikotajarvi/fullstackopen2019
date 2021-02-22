interface IExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

// interface IExerciseValues {
//     target: number;
//     exercises: Array<number>;
// }

type Exercises = Array<number>;

enum ratingDescriptions {
    BAD = 'Bad',
    NOT_TOO_BAD = 'Not too bad, but could do better',
    GOOD = 'Good',
}

// const parseExerciseArguments = (args: Array<string>): IExerciseValues => {
//     if (args.length < 4) throw new Error('Too few arguments');

//     if (isNaN(Number(args[2]))) {
//         throw new Error('Target must be a number');
//     }

//     let exercises: Array<number> = [];
//     args.slice(3).forEach((arg) => {
//         if (isNaN(Number(arg))) {
//             throw new Error(`Exercise value: ${arg} is not a number`);
//         }
//         exercises.push(Number(arg));
//     });

//     const target = Number(args[2]);
//     return { target, exercises };
// };

// const test: Exercises = [3, 0, 2, 4.5, 0, 3, 1];

const calculateExercises = (target: number, exercises: Exercises): IExerciseResult => {
    let ratingDescription = ''; // Default to bad cause why not
    let success = false;
    let rating = 1; // Default to 1 because see above
    const trainingDays = exercises.filter((exercise) => exercise > 0).length;
    const average = exercises.reduce((a, b) => a + b, 0) / exercises.length;
    const score = target / average;

    if (score <= 1) {
        ratingDescription = ratingDescriptions.GOOD;
        rating = 3;
        success = true;
    } else if (score > 1 && score <= 1.5) {
        ratingDescription = ratingDescriptions.NOT_TOO_BAD;
        rating = 2;
    } else if (score > 1.5) {
        // This is redundant but we'll leave it here as a "note"
        ratingDescription = ratingDescriptions.BAD;
        rating = 1;
    }

    return {
        periodLength: exercises.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

export default calculateExercises;

// try {
//     const { target, exercises } = parseExerciseArguments(process.argv);
//     console.log(calculateExercises(target, exercises));
// } catch (err) {
//     console.error(err);
// }
