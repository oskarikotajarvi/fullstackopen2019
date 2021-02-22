// interface IBmiValues {
//     height: number;
//     weight: number;
// }

// const parseArguments = (args: Array<string>): IBmiValues => {
//     if (args.length > 4) throw new Error('Too many arguments');
//     if (args.length < 4) throw new Error('Too few arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3]),
//         };
//     } else {
//         throw new Error('Value(s) is (are) not number(s)');
//     }
// };

const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100;
    const bmi: number = weight / Math.pow(heightInMeters, 2);

    // Kinda dumb but oh well
    if (bmi <= 15) {
        return 'Very severely underweight';
    } else if (bmi >= 15 && bmi <= 16) {
        return 'Severely underweight';
    } else if (bmi >= 16 && bmi <= 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 25) {
        return 'Normal (healthy weigth)';
    } else if (bmi >= 25 && bmi <= 30) {
        return 'Overweight';
    } else if (bmi >= 30 && bmi <= 35) {
        return 'Obese class I (Moderately obese)';
    } else if (bmi >= 35 && bmi <= 40) {
        return 'Obese class II (Severely obese)';
    } else if (bmi >= 40) {
        return 'Obese class III (Very severely obese)';
    }

    return 'Something went wrong with the calculations';
};

export default calculateBmi;

// try {
//     const { height, weight } = parseArguments(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (err) {
//     console.error(err);
// }
